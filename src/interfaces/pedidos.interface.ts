import { IEquipo } from './equipo.interface';
import { IProveedor } from './proveedor.interface';

export interface IPedidoResponse {
  message: string;

  response: IPedidoEquipo;
}

export interface IPedidoEquipo {
  id: number;
  proveedor: IProveedor;
  fecha: Date;
  equipos: IEquipo[];
}

export interface IPedido {
  id: number;
  fecha: Date;
  proveedorId: number;
}
