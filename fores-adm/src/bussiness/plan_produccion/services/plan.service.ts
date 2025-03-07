import { Injectable } from '@nestjs/common';
import { ConsumoRepository } from 'src/database/repository/consumo.repository';
import { EsquemaRepository } from 'src/database/repository/esquema.repository';
import { OrdenRepository } from 'src/database/repository/orden.repository';
import { PlanRepository } from 'src/database/repository/plan.repository';
import { CreatePlanProdEntityDto } from 'src/dto/plan.dto';
import { IConsumo } from 'src/interfaces/consumo.interface';
import { IOrden } from 'src/interfaces/orden.interface';
import {
  IPlanProduccion,
  IPlanProduccionDetail,
} from 'src/interfaces/plan.interface';

@Injectable()
export class PlanService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly esquemaRepository: EsquemaRepository,
    private readonly ordenRepository: OrdenRepository,
    private readonly consumoRepository: ConsumoRepository,
  ) {}

  public async changeStatus(value: boolean, id: number): Promise<true | null> {
    try {
      const actPlan = await this.planRepository.changeStatus(value, id);
      if (!actPlan) return null;

      return true;
    } catch {
      return null;
    }
  }

  public async detailPlan(id: number): Promise<IPlanProduccionDetail | null> {
    try {
      const ordenes = (await this.ordenRepository.detailOrdenByPlanId(
        id,
      )) as IOrden[];

      const plan = await this.planRepository.detailById(id);
      if (!plan) return null;

      const consumos: Omit<IConsumo, 'plan'>[] =
        await this.consumoRepository.findByPlanId(plan.id);

      return {
        ...plan,
        ordenes: ordenes,
        consumo: consumos,
      } as IPlanProduccionDetail;
    } catch {
      return null;
    }
  }

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
