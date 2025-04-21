/* eslint-disable indent */
import { Injectable } from '@nestjs/common';
import { PedidoRepository } from 'src/database/repository/pedido.repository';
import { IEquipo } from 'src/interfaces/equipo.interface';
import { IPedido, IPedidoEquipo } from 'src/interfaces/pedidos.interface';
//import { IRolliso } from 'src/interfaces/rolliso.interface';

@Injectable()
export class PedidoService {
  constructor(private readonly pedidoRepository: PedidoRepository) {}

  public async createPedido(date: Date, proveedorId): Promise<IPedido> {
    try {
      const pedido = await this.pedidoRepository.createPedido({
        fecha: date,
        proveedorId: proveedorId,
      });

      const response: IPedido = {
        id: pedido.id,
        fecha: pedido.fecha,
        proveedorId: pedido.proveedorId,
      };

      return response;
    } catch (error) {
      throw new Error(`Error ${error.message}`);
    }
  }

  public async listPedidosByDate(): Promise<IPedidoEquipo[] | null> {
    try {
      const list = await this.pedidoRepository.listCompletePedidoByDate();
      if (!list) return null;

      const response: IPedidoEquipo[] = list.map((pedido) => ({
        id: pedido.id,
        fecha: pedido.fecha,
        proveedor: {
          id: pedido.proveedor.id,
          nombre: pedido.proveedor.nombre,
        },
        equipos: pedido.equipos.map((equipo) => ({
          id: equipo.id,
          rolliso: equipo.rolliso
            ? {
                id: equipo.rolliso.id,
                diametro: equipo.rolliso.diametro,
                longitud: equipo.rolliso.longitud,
                tipo: equipo.rolliso.tipo,
              }
            : null, // Si no hay rolliso asociado, retornamos null
        })),
      }));

      return response;
    } catch {
      return null;
    }
  }

  public async viewPedidoDetail(id: number): Promise<IPedidoEquipo | null> {
    try {
      // Obtenemos el detalle del pedido desde el repositorio
      const pedido = await this.pedidoRepository.getCompletePedidoDetail(id);
      if (!pedido) return null;
      // Transformamos los datos en el formato requerido
      const response: IPedidoEquipo = {
        id: pedido.id,
        fecha: pedido.fecha,
        proveedor: {
          id: pedido.proveedor.id,
          nombre: pedido.proveedor.nombre,
        },
        equipos: pedido.equipos.map((equipo) => {
          return {
            id: equipo.id,
            rolliso: equipo.rolliso
              ? {
                  id: equipo.rolliso.id,
                  diametro: equipo.rolliso.diametro,
                  longitud: equipo.rolliso.longitud,
                  tipo: equipo.rolliso.tipo,
                }
              : null, // Maneja el caso donde un equipo no tiene rolliso asociado
          } as IEquipo;
        }),
      };
      return response;
    } catch (error) {
      throw new Error(`Error al obtener detalles del pedido: ${error.message}`);
    }
  }

  public async deleteCompletePedido(id: number): Promise<string | null> {
    const response = await this.pedidoRepository.deleteCompletePedido(id);
    if (!response) return null;
    return 'Pedido borrado exitosamente';
  }
}
