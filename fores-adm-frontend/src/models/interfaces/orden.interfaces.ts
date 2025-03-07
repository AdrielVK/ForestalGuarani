import { Cabado } from "./cabado.interface";
import { Cliente } from "./cliente.interfaces";

export interface CreateOrdenBody {
  numero: string;
  volumen: number;
  cabadoNombre: string;
  clienteNombre?: string;
  clienteNumero: string;
}

export interface StatsOrden {
  total: number;
  asignados: number;
  no_asignados: number;
  volumen: number;
  cant_filtrada: number;
}

export interface Orden {
  id: number;
  numero: string;
  volumen: number;
  cabado: Cabado;
  cliente: Cliente
}

export interface OrdenDetail extends Orden {
  planId?: number
}

export interface AssociateOrdenBody {
  planId: number,
  ordenId: number,
}

export interface FilterOrden {
  acabado: string;
  cliente: string;
  
}

export type TypeFilterOrden = 'todos' | 'asignados' | 'no_asignados'