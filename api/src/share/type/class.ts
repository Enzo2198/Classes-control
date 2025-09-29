export interface ClassBaseI {
  name: string;
  code: string;
}

export interface ClassI extends ClassBaseI {
  id: number;
}

export interface ClassReqI extends ClassBaseI {}

export interface ClassResI extends ClassI {}