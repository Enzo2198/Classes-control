import {BaseEntity} from "@/modules/base/entities";
import {EntityManager, EntitySubscriberInterface, UpdateEvent} from "typeorm";

export abstract class BaseCascadeSubscriber<T extends BaseEntity> implements EntitySubscriberInterface<T> {
  protected constructor(
    private readonly cascades: {childEntity: any; foreignKey: string}[]
  ) {}

  async beforeUpdate(event: UpdateEvent<T>): Promise<void> {
    if (!event.entity || !event.databaseEntity) return

    const entity = event.entity as T
    const dbEntity = event.databaseEntity as T

    const isSoftDeleted =
      (!dbEntity.deleted_at && !!entity.deleted_at) ||
      (dbEntity.active && !entity.active)

    if (!isSoftDeleted) return

    const delete_by = entity.deleted_by ?? null
    await this.cascadeSoftDelete(delete_by, entity, event.manager)
  }

  private async cascadeSoftDelete(
    deleted_by: number | null,
    parent: T,
    manager: EntityManager
  ) {
    const now = new Date()

    // avoid cascade loop infinity
    const cascadeKey = `__inCascade_${(parent as any).constructor.name}`;
    if ((manager as any)[cascadeKey]) return
    (manager as any)[cascadeKey] = true

    try {
      for (const cascade of this.cascades) {
        const repo = manager.getRepository(cascade.childEntity)

        // Get all active child
        const children = await repo.find({
          where: {
            [cascade.foreignKey]: parent.id,
            active: true,
            deleted_at: null,
          }
        })

        if (!children.length) continue;

        console.debug(
          `[CascadeSoftDelete] ${cascade.childEntity.name} ← ${parent.constructor.name}: ${children.length}`
        );

        // Update soft delete each child
        for (const child of children) {
          child.deleted_by = deleted_by;
          child.deleted_at = now;
          child.active = false;
          child.updated_by = deleted_by;
          child.updated_at = now;
        }

        await repo.save(children, {transaction: false});
      }
    } finally {
      delete (manager as any)[cascadeKey]
    }
  }
}