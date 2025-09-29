import {Injectable} from "@nestjs/common";
import {UserService} from "@/modules/user/services";
import {StudentReqI} from "@/share";

@Injectable()
export class StudentService extends UserService {
  protected handleFind(query, condition): any {
    query = super.handleFind(query, {...condition, role: 'student'});
    return query
  }

  async create(data: StudentReqI): Promise<any> {
    return super.create({...data, role: 'student'})
  }
}