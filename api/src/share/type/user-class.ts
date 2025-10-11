interface ClassUserBaseI {
  class_id: number;
  user_id: number;
}

export interface ClassUserI extends ClassUserBaseI {
  id: number;
}

export interface ClassUserReqI extends ClassUserBaseI {}

export interface ClassUserResI extends ClassUserI {}