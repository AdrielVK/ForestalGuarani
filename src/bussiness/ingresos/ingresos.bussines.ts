import { ResponseClass } from 'src/config/handless/response-class';
import { IngresoBuilder } from './builders/ingresos.builder';
import { CreateCompleteIngresoDto } from 'src/dto/ingresos.dto';
import { ResponseInterface } from 'src/interfaces/response.interface';
import {
  ICreateIngresoResponse,
  IIngresoDetail,
  IIngresoDetailResponse,
} from 'src/interfaces/ingresos.interface';
import { IEquipoToIngreso } from 'src/interfaces/equipo.interface';
import { Injectable } from '@nestjs/common';
import { IngresosService } from './services/ingresos.service';

@Injectable()
export class IngresosBussiness extends ResponseClass {
  constructor(
    private ingresosBuilder: IngresoBuilder,
    private readonly ingresoService: IngresosService,
  ) {
    super();
  }

  public async listIngresos(): Promise<ResponseInterface<IIngresoDetail[]>> {
    try {
      const ingresos = await this.ingresoService.getListIngresos();
      if (!ingresos)
        return this.badRequest(
          'Error al intentar obtener la lista de ingresos',
        );
      return this.success(ingresos);
    } catch {
      return this.badRequest('Error al intentar obtener la lista de ingresos');
    }
  }
  public async getIngresoDetail(
    id: number,
  ): Promise<ResponseInterface<IIngresoDetailResponse>> {
    try {
      const ingreso = await this.ingresoService.getIngresoDetail(id);
      if (!ingreso)
        return this.badRequest(
          'Error al intentar obtener el detalle del ingreso',
        );
      return this.success({
        message: 'Detalle del ingreso',
        response: ingreso,
      });
    } catch {
      return this.badRequest(
        'Error al intentar obtener el detalle del ingreso',
      );
    }
  }

  public async createCompleteIngreso(
    data: CreateCompleteIngresoDto,
  ): Promise<ResponseInterface<ICreateIngresoResponse>> {
    try {
      await this.ingresosBuilder.setProveedor(data.proveedorName);
      await this.ingresosBuilder.setRemito({
        fecha: data.fecha,
        peso: data.peso,
      });
      await this.ingresosBuilder.setIngreso({
        fuente_controlada: data.fuente_controlada,
        fecha: data.fecha,
        chofer: data.chofer,
        patente: data.patente,
      });
      await this.ingresosBuilder.setEquipos(data.equipos);

      const ingreso = await this.ingresosBuilder.build();

      if (!ingreso) return this.badRequest('Error al crear el ingreso');

      const response: IIngresoDetail = {
        id: ingreso.id,
        fuente_controlada: ingreso.fuente_controlada,
        chofer: ingreso.chofer,
        patente: ingreso.patente,
        fecha: ingreso.fecha,
        remito: ingreso.remito,
        proveedor: ingreso.proveedor,
        equipos: ingreso.equipos as IEquipoToIngreso[],
      };

      return this.create({
        message: 'Ingreso creado exitosamente',
        response: response,
      });
    } catch {
      return this.badRequest('ErrorR al crear el ingreso');
    }
  }
}
