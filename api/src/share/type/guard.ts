import {AvatarInfo, Role, UserResI} from "@/share";

export interface ReqWithUserI extends Request {
  request: {
      id: number;
      sub: number; // user id
      data: TokenPayloadData;
      iat: number; // issued at
      exp: number; // expired at
  };
  user: UserResI
}

export interface TokenPayload {
  sub: number; // user id
  data: TokenPayloadData;
  iat: number; // issued at
  exp: number; // expired at
}

export interface TokenPayloadData {
  name: string;
  email: string;
  role: Role;
  avatar_info: AvatarInfo | null;
}

export interface RequestWithUser extends Request {
  user: UserResI;
}