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

/*
  "id": 1,
    "identificador": 1,
    "ocupado": true,
    "equipo": {
        "id": 14,
        "rolliso": {
            "id": 1,
            "diametro": "10",
            "longitud": "110",
            "tipo": "l"
        }
    }
*/

export interface PosicionStock {
  id: number;
  identificador: number;
  ocupado: boolean;
  equipo: Equipo
}