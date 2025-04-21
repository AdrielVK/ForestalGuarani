import { Injectable } from '@nestjs/common';
import { ResponseClass } from 'src/config/handless/response-class';
import { CreatePedidoRequestDto } from './dto/request.dto';
import {
  IPedidoEquipo,
  IPedidoResponse,
} from 'src/interfaces/pedidos.interface';
import { PedidoBuilder } from './builders/pedido.builder';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { PedidoService } from './services/pedido.service';

@Injectable()
export class PedidosBussiness extends ResponseClass {
  constructor(
    private pedidoBuilder: PedidoBuilder,
    private readonly pedidoService: PedidoService,
  ) {
    super();
  }

  public async createCompletePedido(
    data: CreatePedidoRequestDto,
  ): Promise<ResponseInterface<IPedidoResponse>> {
    try {
      await this.pedidoBuilder.setProveedor({ nombre: data.proveedor_nombre });

      await this.pedidoBuilder.setFecha(data.pedido_fecha);

      await this.pedidoBuilder.setPedido();

      await this.pedidoBuilder.setEquipos({
        rollisos: data.rollisos,
      });

      const pedido = await this.pedidoBuilder.build();

      if (pedido) {
        const response: IPedidoEquipo = {
          id: pedido.id,
          fecha: pedido.fecha,
          proveedor: pedido.proveedor,
          equipos: pedido.equipos,
        };
        return this.create({
          message: 'Nuevo pedido creado',
          response: response,
        });
      } else {
        return this.badRequest('Error al crear un pedido');
      }
    } catch {
      return this.badRequest('Error al crear un pedido');
    }
  }

  public async listCompletePedidoByDate(): Promise<
    ResponseInterface<IPedidoEquipo[]>
    // eslint-disable-next-line indent
  > {
    const response = await this.pedidoService.listPedidosByDate();
    if (!response) {
      return this.badRequest('Error al obtener la lista de pedidos');
    }

    return this.success(response);
  }

  public async getCompletePedidoDetailt(
    id: number,
  ): Promise<ResponseInterface<IPedidoEquipo>> {
    const pedido = await this.pedidoService.viewPedidoDetail(id);
    if (!pedido) {
      return this.notFound('Error, no se pudo obtener el pedido');
    }
    return this.success(pedido);
  }

  public async deleteCompletePedido(
    id: number,
  ): Promise<ResponseInterface<{ message: string }>> {
    const response = await this.pedidoService.deleteCompletePedido(id);
    if (!response) return this.badRequest('Error al eliminar pedido');
    return this.success({ message: 'Pedido eliminado exitosamente' });
  }
}
