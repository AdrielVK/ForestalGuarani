import { Injectable } from '@nestjs/common';
import { ProveedorService } from 'src/bussiness/proveedor/services/proveedor.service';
import { CreateRemitoDto } from 'src/dto/remito.dto';
import { IProveedor } from 'src/interfaces/proveedor.interface';
import { RemitoService } from '../services/remito.service';
import { SetRollisoPosicionDto } from 'src/dto/rolliso.dto';
import { EquipoService } from '../services/equipo.service';
import { Decimal } from '@prisma/client/runtime/library';
import { PosicionService } from '../services/posicion.service';
import { IngresosService } from '../services/ingresos.service';
import {
  CreateIngresoDBDto,
  CreateIngresoEntityDto,
} from 'src/dto/ingresos.dto';

class Remito {
  id: number;
  peso: number;
  fecha: Date;
}

class Posicion {
  identificador: number;
  ocupado: boolean;
}

class Equipo {
  id: number;
  diametro: Decimal;
  longitud: Decimal;
  tipo: string;
  posicion: Posicion;
}

class Ingreso {
  id: number | null;
  fuente_controlada: boolean | null;
  chofer: string | null;
  patente: string | null;
  fecha: Date | null;

  remito: Remito | null;
  proveedor: IProveedor | null;

  equipos: Equipo[];
}

@Injectable()
export class IngresoBuilder {
  private ingreso: Ingreso = {
    equipos: [],
    id: null,
    fuente_controlada: null,
    chofer: null,
    patente: null,
    fecha: null,
    remito: null,
    proveedor: null,
  };

  constructor(
    private readonly equipoService: EquipoService,
    private readonly proveedorService: ProveedorService,
    private readonly remitoService: RemitoService,
    private readonly posicionService: PosicionService,
    private readonly ingresosService: IngresosService,
  ) {
    this.ingreso = {
      id: null,
      fuente_controlada: null,
      chofer: null,
      patente: null,
      fecha: null,
      remito: null,
      proveedor: null,
      equipos: [],
    };
  }

  public async setIngreso(
    data: CreateIngresoEntityDto,
  ): Promise<IngresoBuilder> {
    const newDate: CreateIngresoDBDto = data as CreateIngresoDBDto;
    newDate.proveedorId = this.ingreso.proveedor.id;
    newDate.remitoId = this.ingreso.remito.id;
    const newIngreso = await this.ingresosService.createIngreso(newDate);
    this.ingreso = {
      ...this.ingreso,
      id: newIngreso.id,
      fuente_controlada: newIngreso.fuente_controlada,
      chofer: newIngreso.chofer,
      patente: newIngreso.patente,
      fecha: newIngreso.fecha,
    };
    return this;
  }

  public async setIngresoFromOutside(
    data: CreateIngresoDBDto,
  ): Promise<IngresoBuilder> {
    const newIngreso = await this.ingresosService.createIngreso(data);
    this.ingreso = {
      ...this.ingreso,
      fuente_controlada: newIngreso.fuente_controlada,
      chofer: newIngreso.chofer,
      patente: newIngreso.patente,
      fecha: newIngreso.fecha,
    };
    return this;
  }

  public async setProveedor(proveedor_nombre: string): Promise<IngresoBuilder> {
    try {
      const proveedor =
        await this.proveedorService.getOrCreateProveedor(proveedor_nombre);
      this.ingreso.proveedor = {
        id: proveedor.id,
        nombre: proveedor.nombre,
      };

      return this;
    } catch {
      return this;
    }
  }

  public async setRemito(data: CreateRemitoDto): Promise<IngresoBuilder> {
    const remito = await this.remitoService.createRemito(data);

    if (remito) {
      this.ingreso.remito = {
        id: remito.id,
        peso: remito.peso,
        fecha: remito.fecha,
      };
    }

    return this;
  }

  public async setEquipos(
    data: SetRollisoPosicionDto[],
  ): Promise<IngresoBuilder> {
    for (const equipo of data) {
      const newEquipo = await this.equipoService.obtainEquipo(equipo);
      const posicion = await this.posicionService.obtainPosicion(
        equipo.posicion,
      );

      const associateIngresoToEquipoEvent =
        await this.equipoService.associateEquipoToIngreso(
          newEquipo.id,
          this.ingreso.id,
        );

      if (!associateIngresoToEquipoEvent) return null;

      const associatePosicionToEquipoEvent =
        await this.posicionService.associatePosicionToEquipo(
          posicion.id,
          newEquipo.id,
        );

      if (!associatePosicionToEquipoEvent) return null;

      const associateEquipoToIngresoEvent =
        await this.equipoService.associateEquipoToIngreso(
          newEquipo.id,
          this.ingreso.id,
        );

      if (!associateEquipoToIngresoEvent) return null;

      this.ingreso.equipos.push({
        id: newEquipo.id,
        diametro: newEquipo.rolliso.diametro,
        longitud: newEquipo.rolliso.longitud,
        tipo: newEquipo.rolliso.tipo,
        posicion: {
          identificador: posicion.identificador,
          ocupado: posicion.ocupado,
        },
      });
    }
    return this;
  }

  public async build(): Promise<Ingreso> {
    return this.ingreso;
  }
}
