import { Orden } from "./orden.interfaces";
import { IPieza } from "./pieza.interface";

export interface CreatePaqueteState {
  identificador: string;

  ingreso: string;

  valueEstado: string;

  alturaEscuadria?: number;

  longitudEscuadria?: number;

  anchoEscuadria?: number;

  volumenPieza: number;

  espesorPieza: number;

  longitudPieza: number;

  anchoPieza: number;

  ordenId?: number;

}

export interface CreatePaqueteRequest {
  identificador: string;
  vol: number;
  ingreso: Date;
  valueEstado: string;
  alturaEscuadria?: number;
  longitudEscuadria?: number;
  anchoEscuadria?: number;
  volumenPieza: number;
  espesorPieza: number;
  longitudPieza: number;
  anchoPieza: number;
  ordenId?: number;
}

export interface IPaqueteDetail {
  id: number;
  identificador: string;
  vol: string;
  ingreso: Date;
  ordenId: number | null;
  estadoId: number;
  piezaId: number;
  orden: Orden | null;
  estado: {
    id: number;
    value: string;
  }
  pieza: IPieza;
}

export interface IPaqueteForCiclo {
  id: number;
  identificador: string;
  vol: string;
  ingreso: Date;
  ordenId: number | null;
  estadoId: number;
  orden: Omit<Orden, 'cliente' | 'cabado'> | null;
  estado: {
    id: number;
    value: string;
  }
}

export interface IPaquete {
  id: number;
  identificador: string;
  vol: string;
  ingreso: Date;
  
  orden: {
    id: number;
    numero: string;
  } | null;

  estado: string

  pieza_vol: string
}

export interface FilterPaquete {
  identificador: string | null;
  vol: string | null;
  ingreso: string | null;

  orden: {
    numero: string | null;
    volumen: number | null;
    cabado_nombre: string | null;
    cliente_nombre: string | null;
  }

  estado_value: string | null;

  pieza: {
    volumen: string | null;
    espesor: string | null;
    longitud: string | null;
    ancho: string | null;
    escuadria: {
      longitud: string | null;
      altura: string | null;
      ancho: string | null;
    };
  }
}

export interface StatsPaquetes {
  total: number;
  volumen_total: number;
  
}

export interface EditEstadoPaqueteRequest {
  id: number,
  estadoValue: string
}