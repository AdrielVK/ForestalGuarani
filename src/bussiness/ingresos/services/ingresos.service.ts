import { Injectable } from '@nestjs/common';
import { IngresoRepository } from 'src/database/repository/ingreso.repository';
import { CreateIngresoDBDto } from 'src/dto/ingresos.dto';
import { IEquipoToIngreso } from 'src/interfaces/equipo.interface';
import { IIngreso, IIngresoDetail } from 'src/interfaces/ingresos.interface';
import { IPosicion } from 'src/interfaces/posicion.interface';
import { IProveedor } from 'src/interfaces/proveedor.interface';
import { IRemito } from 'src/interfaces/remito.interfaces';

@Injectable()
export class IngresosService {
  constructor(private readonly ingresoRepository: IngresoRepository) {}

  public async getListIngresos(): Promise<IIngresoDetail[] | null> {
    try {
      const list = await this.ingresoRepository.getListIngreso();
      if (!list) return null;
      const response: IIngresoDetail[] = [];

      for (const ingreso of list) {
        const equiposToResponse: IEquipoToIngreso[] = [];

        for (const equipo of ingreso.equipo) {
          equiposToResponse.push({
            id: equipo.id,
            diametro: equipo.rolliso.diametro,
            longitud: equipo.rolliso.longitud,
            tipo: equipo.rolliso.tipo,
            posicion: equipo.posicion as IPosicion,
          });
        }

        response.push({
          id: ingreso.id,
          fuente_controlada: ingreso.fuente_controlada,
          chofer: ingreso.chofer,
          patente: ingreso.patente,
          fecha: ingreso.fecha,
          remito: ingreso.remito as IRemito,
          proveedor: ingreso.proveedor as IProveedor,
          equipos: equiposToResponse,
        });
      }

      return response;
    } catch {
      return null;
    }
  }

  public async getIngresoDetail(id: number): Promise<IIngresoDetail | null> {
    try {
      const ingreso = await this.ingresoRepository.getCompleteIngresoDetail(id);

      if (!ingreso) return null;

      const equiposToResponse: IEquipoToIngreso[] = [];

      for (const equipo of ingreso.equipo) {
        equiposToResponse.push({
          id: equipo.id,
          diametro: equipo.rolliso.diametro,
          longitud: equipo.rolliso.longitud,
          tipo: equipo.rolliso.tipo,
          posicion: equipo.posicion as IPosicion,
        });
      }

      const response: IIngresoDetail = {
        id: ingreso.id,
        fuente_controlada: ingreso.fuente_controlada,
        chofer: ingreso.chofer,
        patente: ingreso.patente,
        fecha: ingreso.fecha,
        remito: ingreso.remito as IRemito,
        proveedor: ingreso.proveedor as IProveedor,
        equipos: equiposToResponse,
      };

      return response;
    } catch {
      return null;
    }
  }

  public async createIngreso(
    data: CreateIngresoDBDto,
  ): Promise<IIngreso | null> {
    try {
      const ingreso = await this.ingresoRepository.createIngreso(data);
      if (!ingreso) return null;
      const response: IIngreso = {
        id: ingreso.id,
        patente: ingreso.patente,
        chofer: ingreso.chofer,
        fecha: ingreso.fecha,
        fuente_controlada: ingreso.fuente_controlada,
      };

      return response;
    } catch {
      return null;
    }
  }
}
