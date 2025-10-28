import type {User} from "./user.ts";
import type {LoginResponse} from "./common.ts";

export interface TokenAuth extends LoginResponse {}

export interface AuthState {
  auth: TokenAuth;
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (auth: TokenAuth) => void;
  setUser: (user: Partial<User>) => void;
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  clear: () => void;
}


export interface TokenResponse extends LoginResponse {}