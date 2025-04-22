import { IPaqueteDetail } from "./paquete.interface";

export interface CreateCicloRequest {
  ingreso: Date;
  egreso?: Date;
  paqueteId: number;
}

export interface CreateCicloRequestState {
  ingreso: string;
  egreso?: string;
  paqueteId: number | null;
}

export interface ICicloSecadero {
  id: number;
  ingreso: string;
  egreso?: string;
  paquete?: IPaqueteDetail
}

export interface CicloStats {
  total: number;
  volumenPaquetes: number;
}

export interface FilterCiclos {
  estado: string | null;
  identificador: string | null;
  numeroOrden: string | null;
  fecha: string | null;
  activos: boolean | null;
  fechaStrategy: 'desde' | 'exacta' | 'egreso';
  nombreCliente: string | null;
  cabado: string | null;
} 

export interface SetEgresoRequest {
  id: number;
  egreso: Date
}