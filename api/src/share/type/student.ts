import {UserBaseI, UserI} from "@/share";

export interface StudentBaseI extends UserBaseI{}

export interface StudentI extends UserI {}

export interface StudentReqI extends StudentBaseI {}

export interface StudentResI extends StudentI {}