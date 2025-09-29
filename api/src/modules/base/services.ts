import {InsertQueryBuilder, Repository, UpdateQueryBuilder, SelectQueryBuilder} from "typeorm";
import {BaseEntity} from "@/modules/base/entities";
import {BaseServiceI} from "@/share";

export abstract class BaseService <Entity extends BaseEntity> implements BaseServiceI<any, any> {
  protected constructor(
    protected repository: Repository<Entity>,
  ) {}

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

  private getTableName() {
    return this.repository.metadata.name
  }

  protected handleSelect() {
    const query: SelectQueryBuilder<Entity> = this.repository
      .createQueryBuilder(this.getTableName())
      .select(this.getPublicColumns())
    return query;
  }

  protected handleFind(query, condition) {
    return query.where({...condition})
  }

  findOne: (id: number) => Promise<any>;

  async find(condition = {}) {
    let query: SelectQueryBuilder<Entity> = this.handleSelect()
    query = this.handleFind(query, {...condition, active: true})

    return query.execute();
  }

  async create(data) {
    const query: InsertQueryBuilder<Entity> = this.repository
      .createQueryBuilder('user')
      .insert()
      .values(data)

    return query.execute()
  }

  async updateOne(id, data) {
    const query: UpdateQueryBuilder<Entity> = this.repository
      .createQueryBuilder()
      .update(data)
      .where('id = :id', { id })

    return query.execute();
  }

  updateMany() {

  }

  async softDelete(id) {
    const query: UpdateQueryBuilder<Entity> = this.repository
      .createQueryBuilder(this.getTableName())
      .update({
        active: false,
        deleted_at: new Date(),
      } as any)
      .where('id = :id', {id})

    return query.execute();
  }
}