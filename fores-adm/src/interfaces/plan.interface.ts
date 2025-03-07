import { IConsumo } from './consumo.interface';
import { IEsquemaCorte } from './esquema.interface';
import { IOrden } from './orden.interface';

export interface IPlanProduccion {
  id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  esquema: IEsquemaCorte;
  activo: boolean;
}

export interface IPlanProduccionDetail extends IPlanProduccion {
  ordenes: IOrden[];
  consumo: Omit<IConsumo, 'plan'>[];
}
