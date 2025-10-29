import {UserBaseI, UserResI} from "@/share";

export interface StudentBaseI extends UserBaseI{}

export interface StudentReqI extends StudentBaseI {}

export interface StudentResI extends UserResI {}