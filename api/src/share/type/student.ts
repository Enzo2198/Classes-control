import {UserBaseI} from "@/share";

export interface StudentBaseI extends UserBaseI{}

export interface StudentI extends StudentBaseI {
  id: number;
}

export interface StudentReqI extends StudentBaseI {
  password: string;
}

export interface StudentResI extends StudentI {

}