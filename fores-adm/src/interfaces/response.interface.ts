export enum TypeData {
  WARN = 'WARN',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  EMPTY = '',
}

export interface ResponseInterface<T> {
  code?: number;
  message?: string;
  payload?: T;
  errors?: string[];
  type: TypeData;
}
