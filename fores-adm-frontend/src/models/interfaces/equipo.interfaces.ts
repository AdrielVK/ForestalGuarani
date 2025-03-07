
import { Posicion } from "./ingresos.interface";
import { Rolliso } from "./pedidos.interface";

export interface EquipoStock {
  id: number,
  rolliso: Rolliso,
  posicion: Posicion
}