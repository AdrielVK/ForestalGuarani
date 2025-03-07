export interface Rolliso {
  id: number;
  diametro: string;
  longitud: string;
  tipo: string;
}

export interface Equipo {
  id: number;
  rolliso: Rolliso;
}

export interface Proveedor {
  id: number;
  nombre: string;
}

export interface Pedido {
  id: number;
  fecha: string;
  proveedor: Proveedor;
  equipos?: Equipo[];
}

export interface CreateRolliso {
  diametro: string;
  longitud: string;
  tipo: string;
}

export interface CreateEquipo {
  rollisos: CreateRolliso[];
}

export interface CreatePedido {
  fecha: string;
  proveedor: {
    nombre: string;
  };
  equipos: CreateEquipo[];
}

export interface CreatePedidoState {
  proveedor_nombre: string;
  pedido_fecha: string;
  rollisos: RollisoRequest[]
}

export interface CreatePedidoReq {
  proveedor_nombre: string;
  pedido_fecha?: Date;
  rollisos: RollisoRequest[]
} 

export interface RollisoRequest {
  rolliso_tipo: string;
  rolliso_longitud: number;
  rolliso_diametro: number;
  cantidad_equipos: number
}