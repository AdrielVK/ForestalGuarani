import { CreateEquiposDto } from '../dto/request.dto';
import { IProveedor } from 'src/interfaces/proveedor.interface';
import { IEquipo } from 'src/interfaces/equipo.interface';
import { CreateProveedorDto } from 'src/dto/proveedor.dto';
import { EquipoBuilder } from './equipo.builder';
import { PedidoService } from '../services/pedido.service';
import { ProveedorService } from '../../proveedor/services/proveedor.service';
import { Injectable } from '@nestjs/common';

class Pedido {
  id?: number;
  fecha: Date;
  proveedor?: IProveedor;
  equipos?: IEquipo[];

  constructor(date: Date) {
    this.fecha = date;
  }
}

@Injectable()
export class PedidoBuilder {
  private pedido: Pedido;

  constructor(
    private readonly equipoBuilder: EquipoBuilder,
    private readonly proveedorService: ProveedorService,
    private readonly pedidoService: PedidoService,
  ) {
    this.pedido = new Pedido(new Date());
  }

  public setFecha(date: Date | null): PedidoBuilder {
    if (date) {
      this.pedido.fecha = date;
    }
    return this;
  }

  public async setProveedor(data: CreateProveedorDto): Promise<PedidoBuilder> {
    const proveedor = await this.proveedorService.getOrCreateProveedor(
      data.nombre,
    );

    this.pedido.proveedor = proveedor;

    return this;
  }

  public async setPedido(): Promise<PedidoBuilder> {
    const pedidoInternal = this.pedidoService.createPedido(
      this.pedido.fecha,
      this.pedido.proveedor.id,
    );
    this.pedido.id = (await pedidoInternal).id;
    return this;
  }

  public async setEquipos(data: CreateEquiposDto): Promise<PedidoBuilder> {
    data.pedidoId = this.pedido.id;
    const response: IEquipo[] = (await this.equipoBuilder.build(data)).equipo;
    this.pedido.equipos = response;
    return this;
  }

  public async build(): Promise<Pedido> {
    return this.pedido;
  }
}
