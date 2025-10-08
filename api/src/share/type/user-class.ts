interface ClassUserBaseI {
  classId: number;
  userId: number;
}

export interface ClassUserI extends ClassUserBaseI {
  id: number;
}

export interface ClassUserReqI extends ClassUserBaseI {}

export interface ClassUserResI extends ClassUserI {}