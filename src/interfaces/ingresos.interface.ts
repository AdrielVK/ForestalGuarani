import { IEquipoToIngreso } from './equipo.interface';
import { IProveedor } from './proveedor.interface';
import { IRemito } from './remito.interfaces';

export interface IIngreso {
  id: number;
  fuente_controlada: boolean;
  chofer: string;
  patente: string;
  fecha: Date;
}

export interface IIngresoDetail {
  id: number;
  fuente_controlada: boolean;
  chofer: string;
  patente: string;
  fecha: Date;
  remito: IRemito;
  proveedor: IProveedor;
  equipos: IEquipoToIngreso[];
}

export interface ICreateIngresoResponse {
  message: string;
  response: IIngresoDetail;
}

export interface IIngresoDetailResponse {
  message: string;
  response: IIngresoDetail;
}

export interface IIngresoListResponse {
  message: string;
  response: IIngresoDetail[];
}
