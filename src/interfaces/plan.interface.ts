import { IEsquemaCorte } from './esquema.interface';

export interface IPlanProduccion {
  id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  esquema: IEsquemaCorte;
  activo: boolean;
}
