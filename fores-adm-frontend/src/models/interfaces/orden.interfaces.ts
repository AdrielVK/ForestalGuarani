import { Cabado } from "./cabado.interface";
import { Cliente } from "./cliente.interfaces";

export interface CreateOrdenBody {
  numero: string;
  volumen: number;
  cabadoNombre: string;
  clienteNombre?: string;
  clienteNumero: string;
}

export interface Orden {
  id: number;
  numero: string;
  volumen: number;
  cabado: Cabado;
  cliente: Cliente
}

export interface AssociateOrdenBody {
  planId: number,
  ordenId: number,
}