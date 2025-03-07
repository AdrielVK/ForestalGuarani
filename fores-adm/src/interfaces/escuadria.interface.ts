import { Decimal } from '@prisma/client/runtime/library';

export interface IEscuadria {
  id: number;
  longitud: Decimal;
  altura: Decimal;
  ancho: Decimal;
}
