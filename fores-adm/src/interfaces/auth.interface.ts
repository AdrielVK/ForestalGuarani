export interface IUser {
  id?: number;
  email?: string | null;
  username: string;
  role: string;
}

export interface ResponseLogin {
  access_token: string;
}

export interface ResponseRegister {
  message: string;
}

export enum ROLE {
  ADMIN = 'ADMIN',
  READER = 'READER',
  EDITOR = 'EDITOR',
}
