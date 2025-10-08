import {
  ChangePasswordReqI,
  ClassReqI,
  InvitationI,
  LoginReqI,
  LoginResI,
  StudentReqI,
  TeacherReqI,
  TeacherResI,
  UserReqI,
  UserResI
} from "@/share";
import {ClassUserReqI, ClassUserResI} from "@/share/type/user-class";

export interface BaseServiceI <RequestI, ResponseI> {
  find: (params?: any) => Promise<ResponseI[]>;
  findOne: (id: number) => Promise<ResponseI>;
  findOneBy: (params?: any) => Promise<ResponseI | null>;
  create: (data: RequestI) => Promise<ResponseI>;
  updateOne: (id: number, data: Partial<RequestI>) => Promise<ResponseI>;
  softDelete: (id: number) => Promise<{ msg: string }>;
}

export interface UserServiceI extends BaseServiceI<UserReqI, UserResI>{
  login: (loginReq: LoginReqI) => Promise<LoginResI>
  //
  changePassword: (data: ChangePasswordReqI) => Promise<{ msg: string }>;
}

export interface ClassServiceI extends BaseServiceI<ClassReqI, any> {}

export interface ClassUserServiceI extends BaseServiceI<ClassUserReqI, ClassUserResI> {}

export interface TeacherServiceI extends BaseServiceI<TeacherReqI, TeacherResI> {}

export interface StudentServiceI extends BaseServiceI<StudentReqI, any> {}

export interface InvitationServiceI {
  invite: (invitation: InvitationI) => void
}