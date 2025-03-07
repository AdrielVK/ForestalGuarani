
import { Equipo } from "./pedidos.interface";

export interface PosicionStock {
  id: number,
  identificador: number,
  ocupado: boolean,
  equipo: Equipo
}