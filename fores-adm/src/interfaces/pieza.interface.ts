import { Decimal } from '@prisma/client/runtime/library';

export interface IPieza {
  id: number;
  volumen: Decimal;
  espesor: Decimal;
  longitud: Decimal;
  ancho: Decimal;
  escuadriaId?: number;
}
