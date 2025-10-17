import {
  AnswerReqI, AnswerResI,
  ChangePasswordReqI,
  ClassI,
  ClassReqI, ExamGroupReqI, ExamGroupResI, ExamReqI, ExamResI, ExamResultReqI, ExamResultResI,
  InvitationI,
  LoginReqI,
  LoginResI, RegisterReqI,
  StudentReqI, StudentResI,
  TeacherReqI,
  TeacherResI,
  UserReqI,
  UserResI, UserWithPassI
} from "@/share";
import {ClassUserReqI, ClassUserResI} from "@/share/type/user_class";
import {RefreshTokenReq} from "@/modules/auth/dtos/refreshToken";
import {QuestionReqI, QuestionResI} from "./question";
import {QuestionExamReqI, QuestionExamResI} from "@/share/type/question_exam";
import {FileReqI, FileResI} from "@/share/type/file";

export interface BaseServiceI <RequestI, ResponseI> {
  find: (params?: any) => Promise<ResponseI[]>;
  findOne: (id: number) => Promise<ResponseI>;
  findOneBy: (params?: any) => Promise<ResponseI | null>;
  create: (data: RequestI) => Promise<ResponseI>;
  updateOne: (id: number, data: Partial<RequestI>) => Promise<ResponseI>;
  softDelete: (id: number) => Promise<{ msg: string }>;
}

export interface UserServiceI extends BaseServiceI<UserReqI, UserResI>{
  findUserByEmailWithPassword: (email: string) => Promise<UserWithPassI | null>;
  changePassword: (data: ChangePasswordReqI) => Promise<{ msg: string }>;
}

export interface ClassServiceI extends BaseServiceI<ClassReqI, any> {
  createAndJoinClass: (data: ClassReqI) => Promise<ClassI>;
}

export interface UserClassServiceI extends BaseServiceI<ClassUserReqI, ClassUserResI> {}

export interface TeacherServiceI extends BaseServiceI<TeacherReqI, TeacherResI> {}

export interface StudentServiceI extends BaseServiceI<StudentReqI, StudentResI> {}

export interface InvitationServiceI {
  invite: (invitation: InvitationI) => void
}

export interface AuthServiceI {
  login: (loginReq: LoginReqI) => Promise<LoginResI>
  register: (data: RegisterReqI) => Promise<{msg: string}>
  refreshToken: (data: RefreshTokenReq) => Promise<LoginResI>
}

export interface QuestionServiceI extends BaseServiceI<QuestionReqI, QuestionResI> {
  createMany: (data: QuestionReqI[]) => Promise<QuestionReqI[]>;
  updateMany: (data: QuestionReqI[]) => Promise<QuestionReqI[]>;
}

export interface ExamServiceI extends BaseServiceI<ExamReqI, ExamResI> {}
export interface ExamGroupServiceI extends BaseServiceI<ExamGroupReqI, ExamGroupResI> {}

export interface QuestionExamServiceI extends BaseServiceI<QuestionExamReqI, QuestionExamResI> {}

export interface FileServiceI extends BaseServiceI<FileReqI, FileResI> {
  uploadAndCreateFile: (file: Express.Multer.File) => Promise<FileResI>;
}

export interface ExamResultServiceI extends BaseServiceI<ExamResultReqI, ExamResultResI> {
  findAndFilter: (userId: number, examGroupId: number) => Promise<ExamResultReqI[]>;
}

export interface AnswerServiceI extends BaseServiceI<AnswerReqI, AnswerResI>{
  updateMany: (data: AnswerReqI[]) => Promise<AnswerResI[]>;
}