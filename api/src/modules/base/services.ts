import {
  InsertQueryBuilder,
  Repository,
  UpdateQueryBuilder,
  SelectQueryBuilder,
  InsertResult,
  UpdateResult, FindOptionsWhere
} from "typeorm";
import {BaseEntity} from "@/modules/base/entities";
import {BaseServiceI, Role, UserI} from "@/share";
import {ClsService} from "nestjs-cls";
import {InternalServerErrorException, NotFoundException} from "@nestjs/common";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";

export abstract class BaseService<Entity extends BaseEntity, RequestI, ResponseI> implements BaseServiceI<any, any> {
  protected constructor(
    protected repository: Repository<Entity>,
    protected readonly cls: ClsService,
  ) {
  }

  protected getUserId(): number | null {
    const user = this.cls.get<UserI>('user');
    return user ? user.id : null;
  }

  protected getUserRole(): Role | null {
    const user = this.cls.get<UserI>('user');
    return user ? user.role : null;
  }

  protected getPublicColumns() {
    const privateColumns = [
      'created_at',
      'created_by',
      'updated_at',
      'updated_by',
      'deleted_at',
      'deleted_by',
      'active',
    ];
    const columns: string[] = this.repository.metadata.columns.map(
      (column) => column.propertyName,
    );
    return columns.filter((column) => !privateColumns.includes(column));
  }

  protected getTableName() {
    return this.repository.metadata.name
  }

  protected handleSelect(): SelectQueryBuilder<Entity> {
    return this.repository
      .createQueryBuilder(this.getTableName())
      .select(this.getPublicColumns())
  }

  protected handleFind(
    query: SelectQueryBuilder<Entity>,
    condition: Partial<Record<keyof Entity, any>>,
  ): SelectQueryBuilder<Entity> {
    let index = 0;

    for (const [key, value] of Object.entries(condition)) {
      if (value === undefined || value === null) continue;

      const paramName = `param_${index++}`

      if (Array.isArray(value)) {
        query = index === 1
          ? query.where(`${query.alias}.${key} IN (:...${paramName})`, {[paramName]: value})
          : query.andWhere(`${query.alias}.${key} IN (:...${paramName})`, {[paramName]: value});
        continue;
      }

      if (typeof value === 'string' && value.includes('%')) {
        query = index === 1
          ? query.where(`${query.alias}.${key} LIKE :${paramName}`, {[paramName]: value})
          : query.andWhere(`${query.alias}.${key} LIKE :${paramName}`, {[paramName]: value});
        continue;
      }

      query = index === 1
        ? query.where(`${query.alias}.${key} = :${paramName}`, {[paramName]: value})
        : query.andWhere(`${query.alias}.${key} = :${paramName}`, {[paramName]: value})
    }
    return query
  }

  async find(condition = {}) {
    let query: SelectQueryBuilder<Entity> = this.handleFind(
      this.handleSelect(),
      {...condition, active: true} as Partial<Record<keyof Entity, any>>
    )

    return query.getRawMany<ResponseI>();
  }

  async findOne(id: number) {
    const query: SelectQueryBuilder<Entity> = this.handleFind(
      this.handleSelect(),
      {id, active: true} as Partial<Record<keyof Entity, any>>
    );

    const response = await query.getRawOne<ResponseI>();

    if (!response) {
      throw new NotFoundException('Record not found');
    }

    return response;
  }

  async findOneBy(condition = {}) {
    let query: SelectQueryBuilder<Entity> = this.handleSelect();
    query = this.handleFind(query, { ...condition, active: true } as Partial<
      Record<keyof Entity, any>
    >);

    const response = await query.getRawOne<ResponseI>();
    if (!response) return null;
    return response;
  }

  async create(data: RequestI) {
    const userId: number | null = this.getUserId();
    const dataWithUserId = { ...data, created_by: userId };

    const query: InsertQueryBuilder<Entity> = this.repository
      .createQueryBuilder(this.getTableName())
      .insert()
      .values(dataWithUserId as QueryDeepPartialEntity<Entity>)
      .returning(this.getPublicColumns());
    const response: InsertResult = await query.execute();
    if (
      !response ||
      !Array.isArray(response.raw) ||
      response.raw.length === 0
    ) {
      throw new InternalServerErrorException('Failed to create new record');
    }
    return response.raw[0] as ResponseI;
  }

  async updateOne(id: number, data: Partial<RequestI>) {
    const userId: number | null = this.getUserId();
    const dataWithUserId = { ...data, updated_by: userId };

    const query: UpdateQueryBuilder<Entity> = this.repository
      .createQueryBuilder(this.getTableName())
      .update()
      .set(dataWithUserId as QueryDeepPartialEntity<Entity>)
      .where('id = :id and active = :active', { id, active: true })
      .returning(this.getPublicColumns());

    const response: UpdateResult = await query.execute();
    if (
      !response ||
      !Array.isArray(response.raw) ||
      response.raw.length === 0
    ) {
      throw new InternalServerErrorException('Failed to update record');
    }
    return response.raw[0] as ResponseI;
  }

  async softDelete(id: number) {

    const entity: Entity | null = await this.repository
      .findOne({ where: { id, active: true } as FindOptionsWhere<Entity>});
    if (!entity) {
      throw new NotFoundException('Record not found or has already been deleted');
    }

    const userId: number | null = this.getUserId();
    const now = new Date();

    entity.deleted_at = now;
    entity.deleted_by = userId;
    entity.active = false;
    entity.updated_at = now;
    entity.updated_by = userId;

    await this.repository.save(entity);

    return {
      msg: 'Successfully deleted',
    };
  }
}