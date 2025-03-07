import { Equipo, Proveedor } from "./pedidos.interface";

export interface CreateIngresosState {
  proveedorName: string;
  fuente_controlada: boolean;
  fecha: string;
  chofer: string;
  patente: string;
  peso: number;
  equipos: EquiposToIngresos[]
}

export interface CreateIngresosRequest {
  proveedorName: string;
  fuente_controlada: boolean;
  fecha: Date;
  chofer: string;
  patente: string;
  peso: number;
  equipos: EquiposToIngresos[]
}

export interface EquiposToIngresos {
  id?: number;
  tipo: string;
  diametro: number;
  longitud: number;
  posicion: number;
}

export interface IngresoProps {
  id: number;
  fuente_controlada: boolean;
  chofer: string;
  patente: string;
  fecha: string;
  remito: Remito;
  proveedor: Proveedor;
  equipos: EquiposToIngresos[];
}

export interface IngresoDetail {
  id: number;
  fuente_controlada: boolean;
  chofer: string;
  patente: string;
  fecha: string;
  remito: Remito;
  proveedor: Proveedor;
  equipos: EquipoToIngreso[];
}

export interface EquipoToIngreso {
  id: number;
  diametro: number;
  longitud: number;
  tipo: string;
  posicion:Posicion | null;
}

export interface Posicion {
  id: number;
  identificador: number;
  ocupado: boolean;
}

export interface Remito {
  id: number;
  fecha: string;
  peso: number;
}

export interface IngresosStats {
  total: number;
  fuente_controlada: number;
  fuente_no_controlada: number;
  peso_total: number;
  peso_controlada: number;
  peso_no_controlada: number;
}

export interface PosicionStock {
  id: number;
  identificador: number;
  ocupado: boolean;
  equipo: Equipo
}