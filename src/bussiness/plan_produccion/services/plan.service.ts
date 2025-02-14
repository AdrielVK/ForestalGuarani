import { Injectable } from '@nestjs/common';
import { EsquemaRepository } from 'src/database/repository/esquema.repository';
import { PlanRepository } from 'src/database/repository/plan.repository';
import { CreatePlanProdEntityDto } from 'src/dto/plan.dto';
import { IPlanProduccion } from 'src/interfaces/plan.interface';

@Injectable()
export class PlanService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly esquemaRepository: EsquemaRepository,
  ) {}

  public async list(): Promise<IPlanProduccion[] | null> {
    try {
      return await this.planRepository.listOfPlan();
    } catch {
      return null;
    }
  }

  public async create(
    data: CreatePlanProdEntityDto,
  ): Promise<IPlanProduccion | null> {
    try {
      const newPlan = await this.planRepository.createPlan(data);
      if (!newPlan) return null;
      const esquema = await this.esquemaRepository.findById(newPlan.esquemaId);
      if (!esquema) return null;
      return {
        id: newPlan.id,
        fecha_inicio: newPlan.fecha_inicio,
        fecha_fin: newPlan.fecha_fin,
        activo: newPlan.activo,
        esquema: {
          id: esquema.id,
          longitud: esquema.longitud,
          ancho: esquema.ancho,
          espesor: esquema.espesor,
        },
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
