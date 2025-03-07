import { ICabado } from './cabado.interface';
import { ICliente } from './cliente.interface';

export interface IOrden {
  id: number;
  numero: string;
  volumen: number;

  cabado: ICabado;
  cliente: ICliente;
}
