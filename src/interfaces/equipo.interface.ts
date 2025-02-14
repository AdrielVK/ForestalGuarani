import { Decimal } from '@prisma/client/runtime/library';
import { IRolliso } from './rolliso.interface';
import { IPosicion } from './posicion.interface';

export interface IEquipo {
  id: number;
  rolliso: IRolliso;
}

export interface IEquipoResponse {
  id: number;
  rolliso: IRolliso | null;
}

export interface IEquipoToIngreso {
  id: number;
  diametro: Decimal;
  longitud: Decimal;
  tipo: string;
  posicion: IPosicion;
}

export interface IEquipoStock {
  id: number;
  rolliso: IRolliso;
  posicion: IPosicion;
}
