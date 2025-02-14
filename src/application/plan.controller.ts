import { CreatePlanRequestControllerDto } from './../dto/plan.dto';
import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { PlanBussiness } from 'src/bussiness/plan_produccion/plan.bussines';
import { IPlanProduccion } from 'src/interfaces/plan.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';

@Controller('plan')
export class PlanController {
  constructor(private readonly planBussiness: PlanBussiness) {}

  @Post('create')
  public async createPlan(
    @Body(new ValidationPipe()) data: CreatePlanRequestControllerDto,
  ): Promise<
    ResponseInterface<{ message: string; response: IPlanProduccion }>
  > {
    return await this.planBussiness.createPlan(data);
  }

  @Get('list')
  public async list(): Promise<ResponseInterface<IPlanProduccion[]>> {
    return await this.planBussiness.list();
  }
}
