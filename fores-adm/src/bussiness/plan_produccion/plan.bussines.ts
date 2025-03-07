import { ResponseClass } from 'src/config/handless/response-class';
import { PlanBuilder } from './builders/plan.builder';
import { Injectable } from '@nestjs/common';
import { CreatePlanRequestDto } from 'src/dto/plan.dto';
import {
  IPlanProduccion,
  IPlanProduccionDetail,
} from 'src/interfaces/plan.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { PlanService } from './services/plan.service';

@Injectable()
export class PlanBussiness extends ResponseClass {
  constructor(
    private readonly planBuilder: PlanBuilder,
    private readonly planService: PlanService,
  ) {
    super();
  }

  public async changeStatus(
    value: boolean,
    id: number,
  ): Promise<ResponseInterface<{ message: string }>> {
    try {
      const res = await this.planService.changeStatus(value, id);
      if (!res) return this.badRequest('No se pudo cambiar el status del plan');

      return this.success({ message: 'Status del plan cambiado' });
    } catch {
      return this.badRequest('No se pudo cambiar el status del plan');
    }
  }

  public async detailPlan(
    id: number,
  ): Promise<ResponseInterface<IPlanProduccionDetail>> {
    try {
      const response = await this.planService.detailPlan(id);

      if (!response)
        return this.badRequest(
          'Error al obtener el datalle del plan de produccion',
        );

      return this.success(response);
    } catch {
      return this.badRequest(
        'Error al obtener el datalle del plan de produccion',
      );
    }
  }

  public async list(): Promise<ResponseInterface<IPlanProduccion[]>> {
    try {
      const response = await this.planService.list();
      if (!response)
        return this.badRequest(
          'Error al obtener la lista de planes de produccion',
        );
      return this.success(response);
    } catch {
      return this.badRequest(
        'Error al obtener la lista de planes de produccion',
      );
    }
  }

  public async createPlan(
    data: CreatePlanRequestDto,
  ): Promise<
    ResponseInterface<{ message: string; response: IPlanProduccion }>
  > {
    try {
      await this.planBuilder.setEsquema({
        longitud: data.longitud,
        ancho: data.ancho,
        espesor: data.espesor,
      });

      await this.planBuilder.setPlan({
        fecha_inicio: data.fecha_inicio,
        fecha_fin: data.fecha_fin,
        activo: data.activo,
      });

      const response = await this.planBuilder.build();

      if (!response)
        return this.badRequest('Error al intentar crear un plan de produccion');

      return this.success({
        message: 'Plan creado exitosamente',
        response: {
          id: response.id,
          fecha_inicio: response.fecha_inicio,
          fecha_fin: response.fecha_fin,
          activo: response.activo,
          esquema: {
            id: response.esquema.id,
            ancho: response.esquema.ancho,
            longitud: response.esquema.longitud,
            espesor: response.esquema.espesor,
          },
        },
      });
    } catch {
      return this.badRequest('Error al intentar crear un plan de produccion');
    }
  }
}
