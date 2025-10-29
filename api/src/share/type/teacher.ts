import {UserBaseI, UserResI} from "@/share";

export interface TeacherBaseI extends UserBaseI{}

export interface TeacherReqI extends TeacherBaseI {}

export interface TeacherResI extends UserResI {}