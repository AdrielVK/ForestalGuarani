import { OrdenBuilder } from './builders/orden.builder';
import { Injectable } from '@nestjs/common';
import { ResponseClass } from 'src/config/handless/response-class';
import { CreateOrdenRequestDto } from 'src/dto/orden.dto';
import { IOrden } from 'src/interfaces/orden.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { OrdenService } from './services/orden.service';

@Injectable()
export class OrdenBussiness extends ResponseClass {
  constructor(
    private readonly ordenBuilder: OrdenBuilder,
    private readonly ordenService: OrdenService,
  ) {
    super();
  }

  public async associteOrdenesToPlan(
    planId: number,
    ordenId: number,
  ): Promise<ResponseInterface<IOrden>> {
    try {
      const res = await this.ordenService.associateOrdenes(planId, ordenId);
      if (!res)
        return this.badRequest('Error al intentar obtener la lista de ordenes');
      return this.success(res);
    } catch {
      return this.badRequest('Error al intentar obtener la lista de ordenes');
    }
  }

  public async deleteOrden(
    id: number,
  ): Promise<ResponseInterface<{ message: string }>> {
    try {
      const response = await this.ordenService.deleteOrden(id);
      if (!response) return this.badRequest('Error al eliminar la orden');

      return this.success({ message: response });
    } catch {
      return this.badRequest('Error al eliminar la orden');
    }
  }

  public async listOrdenesFree(): Promise<ResponseInterface<IOrden[]>> {
    try {
      const res = await this.ordenService.listOrdenesFree();
      if (!res)
        return this.badRequest('Error al intentar obtener la lista de ordenes');
      return this.success(res);
    } catch {
      return this.badRequest('Error al intentar obtener la lista de ordenes');
    }
  }

  public async listOrdenesFreeOfPaquete(): Promise<
    ResponseInterface<IOrden[]>
    // eslint-disable-next-line indent
  > {
    try {
      const res = await this.ordenService.listOrdenesFreeOfPaquete();
      if (!res)
        return this.badRequest('Error al intentar obtener la lista de ordenes');
      return this.success(res);
    } catch {
      return this.badRequest('Error al intentar obtener la lista de ordenes');
    }
  }

  public async listOrdenes(): Promise<ResponseInterface<IOrden[]>> {
    try {
      const res = await this.ordenService.listOrdenes();
      if (!res)
        return this.badRequest('Error al intentar obtener la lista de ordenes');
      return this.success(res);
    } catch {
      return this.badRequest('Error al intentar obtener la lista de ordenes');
    }
  }

  public async createOrden(
    data: CreateOrdenRequestDto,
  ): Promise<ResponseInterface<{ message: string; response: IOrden }>> {
    try {
      await this.ordenBuilder.setCliente({
        nombre: data.clienteNombre,
        numero: data.clienteNumero,
      });

      await this.ordenBuilder.setCabado(data.cabadoNombre);

      await this.ordenBuilder.setOrden({
        numero: data.numero,
        volumen: data.volumen,
      });

      const completeOrden = await this.ordenBuilder.build();

      if (!completeOrden || completeOrden.id === null)
        return this.badRequest(
          'Error al intentar crear la orden de produccion',
        );

      return this.success({
        message: 'Orden creada exitosamente',
        response: {
          id: completeOrden.id,
          numero: completeOrden.numero,
          volumen: completeOrden.volumen,

          cabado: {
            id: completeOrden.cabado.id,
            nombre: completeOrden.cabado.nombre,
          },

          cliente: {
            id: completeOrden.cliente.id,
            nombre: completeOrden.cliente.nombre,
            numero: completeOrden.numero,
          },
        },
      });
    } catch {
      return this.badRequest('Error al intentar crear la orden de produccion');
    }
  }
}
