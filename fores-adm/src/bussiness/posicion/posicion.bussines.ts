import { ResponseClass } from 'src/config/handless/response-class';
import { ResponseInterface } from 'src/interfaces/response.interface';

import { Injectable } from '@nestjs/common';
import { PosicionService } from '../ingresos/services/posicion.service';
import {
  IPosicion,
  IPosicionResponse,
  IPosicionStock,
} from 'src/interfaces/posicion.interface';

@Injectable()
export class PosicionBussiness extends ResponseClass {
  constructor(private readonly posicionService: PosicionService) {
    super();
  }

  public async countPosiciones(): Promise<ResponseInterface<number>> {
    try {
      const num = await this.posicionService.countPosiciones();
      if (!num)
        return this.badRequest('Error al obtener la cantidad de posiciones');

      return this.success(num);
    } catch {
      return this.badRequest('Error al obtener la cantidad de posiciones');
    }
  }

  public async listPosicionStock(): Promise<
    ResponseInterface<IPosicionStock[]>
    // eslint-disable-next-line indent
  > {
    try {
      const response = await this.posicionService.listPosicionStock();
      if (!response)
        return this.badRequest('Error al obtener el stock por posicion');
      return this.success(response);
    } catch {
      return this.badRequest('Error al obtener el stock por posicion');
    }
  }

  public async deletePosicion(
    id: number,
  ): Promise<ResponseInterface<{ message: string }>> {
    try {
      const res = await this.posicionService.deletePosicion(id);
      if (!res)
        return this.badRequest('Error al intentar eliminar la posicion');
      return this.success({ message: 'Posicion eliminada correctamente' });
    } catch {
      return this.badRequest('Error al intentar eliminar la posicion');
    }
  }

  public async setFreePosicion(
    id: number,
  ): Promise<ResponseInterface<IPosicionResponse>> {
    try {
      const posicion = await this.posicionService.setFreePosicion(id);
      if (!posicion) return this.badRequest('Error al desocupar la posicion');
      return this.success({
        message: 'Posicion liberada correctamente',
        response: posicion,
      });
    } catch {
      return this.badRequest('Error al desocupar la posicion');
    }
  }

  public async createPosicion(
    identificador: number,
  ): Promise<ResponseInterface<IPosicionResponse>> {
    try {
      const response = await this.posicionService.createPosicion(identificador);
      if (!response) return this.badRequest('Error al crear una posicion');
      return this.success({
        message: 'Posicion creada exitosamente',
        response: response,
      });
    } catch {
      return this.badRequest('Error al crear una posicion');
    }
  }

  public async listPosicion(): Promise<ResponseInterface<IPosicion[]>> {
    try {
      const posiciones = await this.posicionService.listPosicion();
      if (!posiciones)
        return this.badRequest(
          'Error al intentar obtener la lista de posiciones',
        );
      return this.success(posiciones);
    } catch {
      return this.badRequest(
        'Error al intentar obtener la lista de posiciones',
      );
    }
  }
}
