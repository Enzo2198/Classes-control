import {BaseService} from "@/modules/base/services";
import {Inject, Injectable} from "@nestjs/common";
import {Repository, SelectQueryBuilder} from "typeorm";
import {ClassEntity} from "@/modules/class/entities";
import {ClassEntityRepository, ClassServiceI, UserClassServiceToken} from "@/share";
import {UserClassEntity} from "@/modules/user_class/entities";
import {UserEntity} from "@/modules/user/entities";
import {UserClassService} from "@/modules/user_class/services";

@Injectable()
export class ClassService extends BaseService<ClassEntity> implements ClassServiceI {
  constructor(
    @Inject(ClassEntityRepository)
    protected repository: Repository<ClassEntity>,

    // @Inject(UserClassServiceToken)
    // private userClassService: UserClassService,
  ) {
    super(repository);
  }

  protected handleSelect(): SelectQueryBuilder<ClassEntity> {
    return this.repository
      .createQueryBuilder('class')
      .select([
        'class.id as id',
        'class.name as name',
        'class.code as code',
        `
          coalesce(
            json_agg(
              json_build_object(
                'id', "user".id,
                'name', "user".name,
                'role', "user".role
              )
            ) filter ( where  "user".role = 'teacher')
          ) as "teachers",

          coalesce(
            json_agg(
              json_build_object(
                'id', "user".id,
                'name', "user".name,
                'role', "user".role
              )
            ) filter ( where  "user".role = 'student')
           ) as "students"
        `
      ])
      .innerJoin(UserClassEntity, 'user_class', 'user_class."classId" = class.id and user_class.active')
      .innerJoin(UserEntity, 'user', '"user"."id" = user_class.userId and user.active')
      .groupBy("class.id, class.code, class.name")
  }
}