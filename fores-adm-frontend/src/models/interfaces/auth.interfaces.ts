export interface User {
  id?: number;
  username: string;
  email: string | null;
  role: ROLE
}


export enum ROLE {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  READER = "READER"
}

export interface ILogin {
  //email?: string;s
  username: string,
  password: string
}

export interface ICreateUser {
  email?: string;
  username: string,
  password: string,
}

export interface ChangePasswordRequest {
  oldPassword: string;
  id: number;
  newPassword: string;
}

export interface ChangePasswordState {
  password: string;

  newPassword: string;
  reNewPassword: string;
}