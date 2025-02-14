import { CabadoService } from './../../cabado/services/cabado.service';
import { Injectable } from '@nestjs/common';
import { ClienteService } from 'src/bussiness/cliente/services/cliente.service';
import { GetOrCreateClienteDto } from 'src/dto/cliente.dto';
import { CreateBuilderOrdenProdDto } from 'src/dto/orden.dto';
import { OrdenService } from '../services/orden.service';

class Cabado {
  id: number;
  nombre: string;
}

class Cliente {
  id: number;
  numero: string;
  nombre: string;
}

class Orden {
  id: number | null;
  numero: string | null;
  volumen: number | null;

  cabado: Cabado | null;
  cliente: Cliente | null;
}

@Injectable()
export class OrdenBuilder {
  private orden: Orden;

  constructor(
    private readonly clienteService: ClienteService,
    private readonly cabadoService: CabadoService,
    private readonly ordenService: OrdenService,
  ) {
    this.orden = {
      id: null,
      numero: null,
      volumen: null,
      cabado: null,
      cliente: null,
    };
  }

  public async setCliente(data: GetOrCreateClienteDto): Promise<OrdenBuilder> {
    try {
      if (data.nombre && data.numero) {
        const newCliente = await this.clienteService.createCliente(
          data.numero,
          data.nombre,
        );

        if (!newCliente) return this;

        this.orden.cliente = {
          id: newCliente.id,
          numero: newCliente.numero,
          nombre: newCliente.nombre,
        };

        return this;
      }

      const currentCliente = await this.clienteService.getCliente(data.numero);
      if (!currentCliente) return this;

      this.orden.cliente = {
        id: currentCliente.id,
        numero: currentCliente.numero,
        nombre: currentCliente.nombre,
      };

      return this;
    } catch (error) {
      console.log('errorrr', error);
      return null;
    }
  }

  public async setCabado(nombre: string): Promise<OrdenBuilder> {
    try {
      const cabado = await this.cabadoService.getOrCreate(nombre);

      if (cabado) {
        this.orden.cabado = {
          id: cabado.id,
          nombre: cabado.nombre,
        };
      }

      return this;
    } catch {
      return this;
    }
  }

  public async setOrden(
    data: CreateBuilderOrdenProdDto,
  ): Promise<OrdenBuilder> {
    try {
      const dataEntity = {
        numero: data.numero,
        volumen: data.volumen,

        cabadoId: this.orden.cabado.id,
        clienteId: this.orden.cliente.id,
      };

      if (!dataEntity) return this;

      const newOrden = await this.ordenService.createOrden(dataEntity);

      if (newOrden) {
        this.orden = {
          ...this.orden,
          id: newOrden.id,
          numero: newOrden.numero,
          volumen: newOrden.volumen,
        };
        return this;
      }
      return null;
    } catch {
      return this;
    }
  }

  public async build(): Promise<Orden> {
    return this.orden;
  }
}
