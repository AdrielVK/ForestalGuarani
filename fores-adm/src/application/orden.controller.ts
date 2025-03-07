import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { OrdenBussiness } from 'src/bussiness/orden/orden.bussines';
import { AssociateToPlanDto, CreateOrdenRequestDto } from 'src/dto/orden.dto';
import { IOrden } from 'src/interfaces/orden.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';

@Controller('orden')
export class OrdenController {
  constructor(private readonly ordenBussiness: OrdenBussiness) {}

  @Get('list/free')
  public async getListFree(): Promise<ResponseInterface<IOrden[]>> {
    return await this.ordenBussiness.listOrdenesFree();
  }

  @Get('list')
  public async getList(): Promise<ResponseInterface<IOrden[]>> {
    return await this.ordenBussiness.listOrdenes();
  }

  @Post('associate/plan')
  public async associateToPlan(
    @Body(new ValidationPipe()) data: AssociateToPlanDto,
  ): Promise<ResponseInterface<IOrden>> {
    return await this.ordenBussiness.associteOrdenesToPlan(
      data.planId,
      data.ordenId,
    );
  }

  @Delete('delete/:id')
  public async deleteOrden(
    @Param('id', ParseIntPipe) id,
  ): Promise<ResponseInterface<{ message: string }>> {
    return await this.ordenBussiness.deleteOrden(id);
  }

  @Post('create')
  public async createOrden(
    @Body(new ValidationPipe()) data: CreateOrdenRequestDto,
  ): Promise<ResponseInterface<{ message: string; response: IOrden }>> {
    return await this.ordenBussiness.createOrden(data);
  }
}
