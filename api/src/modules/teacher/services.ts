import {Injectable} from "@nestjs/common";
import {UserService} from "@/modules/user/services";
import {TeacherReqI} from "@/share";

@Injectable()
export class TeacherService extends UserService {
  protected handleFind(query, condition): any {
    query = super.handleFind(query, {...condition, role: 'teacher'});
    return query
  }

  async create(data: TeacherReqI): Promise<any> {
    return super.create({...data, role: 'teacher'})
  }
}