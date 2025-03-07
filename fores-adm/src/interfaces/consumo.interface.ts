import { IEquipo } from './equipo.interface';
import { IPlanProduccion } from './plan.interface';

export interface IConsumo {
  id: number;
  fecha: Date;
  plan: IPlanProduccion;
  equipo: IEquipo;
}
