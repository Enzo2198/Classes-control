import {BaseService} from "@/modules/base/services";
import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {Repository, SelectQueryBuilder} from "typeorm";
import {ClassEntity} from "@/modules/class/entities";
import {ClassEntityRepository, ClassI, Role, UserClassServiceToken} from "@/share";
import type {ClassReqI, ClassResI, ClassServiceI} from "@/share"
import {UserClassEntity} from "@/modules/user_class/entities";
import {UserEntity} from "@/modules/user/entities";
import {UserClassService} from "@/modules/user_class/services";
import {ClsService} from "nestjs-cls";
import {Transactional} from "typeorm-transactional";

@Injectable()
export class ClassService extends BaseService<ClassEntity, ClassReqI, ClassResI> implements ClassServiceI {
  constructor(
    protected readonly cls: ClsService,
    @Inject(ClassEntityRepository)
    protected readonly repository: Repository<ClassEntity>,
    @Inject(UserClassServiceToken)
    private readonly userClassService: UserClassService,
  ) {
    super(repository, cls);
  }

  protected handleSelect(): SelectQueryBuilder<ClassEntity> {
    return this.repository
      .createQueryBuilder('class')
      .select([
        'class.id::int as id',
        'class.name as name',
        'class.code as code',
        `coalesce(
                    json_agg(
                        json_build_object(
                            'id', "user".id,
                            'name', "user".name,
                            'role', "user".role,
                            'email', "user".email
                        )
                    ) filter (where "user".role = 'teacher'),
                 '[]') as teachers, 
                    
                 coalesce(
                    json_agg(
                        json_build_object(
                            'id', "user".id,
                            'name', "user".name,
                            'role', "user".role,
                            'email', "user".email
                        )
                    ) filter (where "user".role = 'student'),
                 '[]') as students
                `
      ])
      .innerJoin(UserClassEntity, 'user_class', 'user_class.class_id = class.id and user_class.active')
      .innerJoin(UserEntity, 'user', '"user".id = user_class.user_id and "user".active')
      .groupBy('class.id, class.name, class.code');

    console.log(this.getTableName());
  }

  async find(condition = {}) {
    const curUserId: number | null = this.getUserId();
    const userRole: Role | null = this.getUserRole();
    if (!curUserId || !userRole) throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    let query = this.handleSelect();
    query = this.handleFind(query, {...condition, active: true});

    if (userRole !== Role.ADMIN) {
      query = query.andWhere(qb => {
        const subQuery = qb.subQuery()
          .select('user_class_2.class_id')
          .from(UserClassEntity, 'user_class_2')
          .where('user_class_2.user_id = :user_id', {user_id: curUserId});
        return 'class.id in ' + subQuery.getQuery();
      });
    }

    return await query.getRawMany();
  }

  async findOne(id: number) {
    const response = await this.find({id});
    if (!response || !Array.isArray(response) || response.length === 0)
      throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    return response[0];
  }

  @Transactional()
  async createAndJoinClass(classReq: ClassReqI): Promise<ClassI> {
    const creatorId = this.getUserId();
    const newClass = await this.create(classReq);
    if (!creatorId || !newClass)
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);

    // Add teacher in user_class
    await this.userClassService.create({
      class_id: newClass.id,
      user_id: creatorId
    })

    const {id, name, code} = newClass;
    return {id, name, code};
  }

  async updateOne(id: number, classReq: ClassReqI): Promise<ClassResI> {
    const userId: number | null = this.getUserId();
    const userRole: Role | null = this.getUserRole();
    if (!userId || !userRole)
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);

    // only teachers of the class and admin can find then update
    const classToUpdate = await this.findOne(id);

    return await super.updateOne(id, classReq);
  }

  async softDelete(id: number) {
    const userId: number | null = this.getUserId();
    const userRole: Role | null = this.getUserRole();
    if (!userId || !userRole)
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);

    // only teachers of the class or the admin can find then delete the class
    const classToDelete = await this.findOne(id);

    return await super.softDelete(id);
  }
}