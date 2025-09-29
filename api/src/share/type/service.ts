import {ClassReqI, InvitationI, StudentReqI, TeacherReqI, UserReqI} from "@/share";

export interface BaseServiceI <RequestI, ResponseI> {
  find: (params?: any) => Promise<ResponseI[]>;
  create: (data: RequestI) => Promise<ResponseI>;
  updateOne: (id: number, data: RequestI) => Promise<ResponseI>;
  softDelete: (id: number) => void
}

export interface UserServiceI extends BaseServiceI<UserReqI, any>{}

export interface ClassServiceI extends BaseServiceI<ClassReqI, any> {}

export interface TeacherServiceI extends BaseServiceI<TeacherReqI, any> {}

export interface StudentServiceI extends BaseServiceI<StudentReqI, any> {}

export interface InvitationServiceI {
  invite: (invitation: InvitationI) => void
}