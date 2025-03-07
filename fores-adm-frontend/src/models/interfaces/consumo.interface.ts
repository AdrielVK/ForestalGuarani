import { Equipo } from "./pedidos.interface"

export interface CreateConsumoBody {
  fecha: Date
  planId: number
  equipoId: number
}

export interface CreateConsumoResponse {
  id: number,
  fecha: Date,
  equipo: Equipo
}

export type Consumo = CreateConsumoResponse;