import { Decimal } from '@prisma/client/runtime/library';

export interface IRolliso {
  id: number;
  diametro: Decimal;
  longitud: Decimal;
  tipo: string;
}
