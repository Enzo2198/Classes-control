import {UserBaseI, UserI} from "@/share";

export interface TeacherBaseI extends UserBaseI{}

export interface TeacherI extends UserI {}

export interface TeacherReqI extends TeacherBaseI {}

export interface TeacherResI extends TeacherI {}