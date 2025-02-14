import { Injectable } from '@nestjs/common';
import { EsquemaService } from 'src/bussiness/esquema_corte/services/esquema.service';
import { PlanService } from '../services/plan.service';
import { FindEsquemaByProps } from 'src/dto/esquema.dto';
import {
  CreatePlanProdBuilderDto,
  CreatePlanProdEntityDto,
} from 'src/dto/plan.dto';

class EsquemaCorte {
  id: number;
  longitud: number;
  ancho: number;
  espesor: number;
}

class PlanProd {
  id?: number;
  fecha_inicio?: Date;
  fecha_fin?: Date;
  esquema?: EsquemaCorte;
  activo?: boolean;
}

@Injectable()
export class PlanBuilder {
  private plan: PlanProd;

  constructor(
    private readonly esquemaService: EsquemaService,
    private readonly planService: PlanService,
  ) {
    this.plan = {};
  }

  public async setEsquema(data: FindEsquemaByProps): Promise<PlanBuilder> {
    try {
      const esquemaData = await this.esquemaService.getOrCreate(data);
      if (!esquemaData) return this;
      this.plan.esquema = esquemaData;
      return this;
    } catch {
      return this;
    }
  }

  public async setPlan(data: CreatePlanProdBuilderDto): Promise<PlanBuilder> {
    try {
      const completeData: CreatePlanProdEntityDto = {
        ...data,
        esquemaId: this.plan.esquema.id,
      };
      const plan = await this.planService.create(completeData);
      if (!plan) return this;
      this.plan = {
        ...this.plan,
        id: plan.id,
        fecha_inicio: plan.fecha_inicio,
        fecha_fin: plan.fecha_fin,
        activo: plan.activo,
      };
      return this;
    } catch {
      return this;
    }
  }

  public async build(): Promise<PlanProd> {
    return this.plan;
  }
}
