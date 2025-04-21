import { Decimal } from '@prisma/client/runtime/library';
import { IEstado } from './estado.interface';
import { IPieza } from './pieza.interface';
import { IOrden } from './orden.interface';

export interface IPaquete {
  id: number;
  identificador: string;
  vol: Decimal;
  ingreso: Date;
  estadoId?: number;
  piezaId?: number;
  ordenId: number;
}

export interface IPaqueteForCiclo {
  id: number;
  identificador: string;
  vol: Decimal;
  ingreso: Date;
  estadoId?: number;
  ordenId: number;
  estado: IEstado;
  orden?: Omit<IOrden, 'cabado' | 'cliente'>;
}

export interface IPaqueteReducedDetails {
  id: number;
  identificador: string;
  vol: Decimal;
  estado: IEstado;
  pieza: IPieza;
  ingreso: Date;
  ordenId?: number;
  orden?: {
    id: number;
    numero: string;
    volumen: number;
    cabadoId: number;
    clienteId: number;
    planId?: number;
    paqueteId?: number;
  };
}

export interface IPaqueteDetails extends IPaquete {
  estado: IEstado;
  pieza: IPieza;
  orden?: IOrden;
}
