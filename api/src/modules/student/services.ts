import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {UserService} from "@/modules/user/services";
import {Role, StudentServiceI} from "@/share";
import {UserEntity} from "@/modules/user/entities";
import {SelectQueryBuilder} from "typeorm";

@Injectable()
export class StudentService extends UserService implements StudentServiceI{
  protected handleFind(
    query: SelectQueryBuilder<UserEntity>,
    condition: Partial<Record<keyof UserEntity, any>>
  ): SelectQueryBuilder<UserEntity> {
    return super.handleFind(query, {...condition, role: 'student'});
  }

  async updateOne(id: number, data: Partial<UserEntity>) {
    const curUserId = this.getUserId();
    const curRole = this.getUserRole();
    if (curUserId !== id && curRole !== Role.ADMIN){
      throw new HttpException('You are not authorized to update this user', HttpStatus.FORBIDDEN);
    }
    return super.updateOne(id, data);
  }

  async softDelete(id: number) {
    const curUserId = this.getUserId();
    const curRole = this.getUserRole();
    if (curUserId !== id && curRole !== Role.ADMIN){
      throw new HttpException('You are not authorized to delete this user', HttpStatus.FORBIDDEN);
    }
    return super.softDelete(id);
  }
}