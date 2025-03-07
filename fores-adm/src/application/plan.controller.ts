import {
  ChangeStatusDto,
  CreatePlanRequestControllerDto,
} from './../dto/plan.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PlanBussiness } from 'src/bussiness/plan_produccion/plan.bussines';
import {
  IPlanProduccion,
  IPlanProduccionDetail,
} from 'src/interfaces/plan.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';

@Controller('plan')
export class PlanController {
  constructor(private readonly planBussiness: PlanBussiness) {}

  @Post('change/status/:id')
  public async changeStatus(
    @Param('id', ParseIntPipe) id,
    @Body(new ValidationPipe()) data: ChangeStatusDto,
  ): Promise<ResponseInterface<{ message: string }>> {
    return await this.planBussiness.changeStatus(data.value, id);
  }

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

  @Get('detail/:id')
  public async detailPlan(
    @Param('id', ParseIntPipe) id,
  ): Promise<ResponseInterface<IPlanProduccionDetail>> {
    return await this.planBussiness.detailPlan(id);
  }
}
