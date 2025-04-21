import { IPaqueteDetails } from './paquete.interface';

export interface ICicloDetails {
  id: number;
  ingreso: Date;
  egreso?: Date;
  paquete?: IPaqueteDetails;
}
