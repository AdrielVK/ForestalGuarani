import { IEquipo } from './equipo.interface';

export interface IPosicion {
  id: number;
  identificador: number;
  ocupado: boolean;
}

export interface IPosicionStock {
  id: number;
  identificador: number;
  ocupado: boolean;
  equipo: IEquipo;
}

export interface IPosicionResponse {
  message: string;
  response: IPosicion;
}
