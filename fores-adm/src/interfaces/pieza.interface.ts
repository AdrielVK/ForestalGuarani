import { Decimal } from '@prisma/client/runtime/library';
import { IEscuadria } from './escuadria.interface';

export interface IPieza {
  id: number;
  volumen: Decimal;
  espesor: Decimal;
  longitud: Decimal;
  ancho: Decimal;
  escuadriaId?: number;
  escuadria?: IEscuadria;
}
