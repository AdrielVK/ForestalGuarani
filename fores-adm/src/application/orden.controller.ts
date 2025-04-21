import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard, JwtRoleEditorGuard } from 'src/bussiness/auth/jwt.guard';
import { OrdenBussiness } from 'src/bussiness/orden/orden.bussines';
import { AssociateToPlanDto, CreateOrdenRequestDto } from 'src/dto/orden.dto';
import { IOrden } from 'src/interfaces/orden.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';

@Controller('orden')
export class OrdenController {
  constructor(private readonly ordenBussiness: OrdenBussiness) {}

  @UseGuards(JwtAuthGuard)
  @Get('list/free')
  public async getListFree(): Promise<ResponseInterface<IOrden[]>> {
    return await this.ordenBussiness.listOrdenesFree();
  }

  @Get('list/free/paquete')
  public async getListFreeOfPaquete(): Promise<ResponseInterface<IOrden[]>> {
    return await this.ordenBussiness.listOrdenesFreeOfPaquete();
  }
  @UseGuards(JwtAuthGuard)
  @Get('list')
  public async getList(): Promise<ResponseInterface<IOrden[]>> {
    return await this.ordenBussiness.listOrdenes();
  }
  @UseGuards(JwtAuthGuard)
  @Post('associate/plan')
  public async associateToPlan(
    @Body(new ValidationPipe()) data: AssociateToPlanDto,
  ): Promise<ResponseInterface<IOrden>> {
    return await this.ordenBussiness.associteOrdenesToPlan(
      data.planId,
      data.ordenId,
    );
  }
  @UseGuards(JwtRoleEditorGuard)
  @Delete('delete/:id')
  public async deleteOrden(
    @Param('id', ParseIntPipe) id,
  ): Promise<ResponseInterface<{ message: string }>> {
    return await this.ordenBussiness.deleteOrden(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('create')
  public async createOrden(
    @Body(new ValidationPipe()) data: CreateOrdenRequestDto,
  ): Promise<ResponseInterface<{ message: string; response: IOrden }>> {
    return await this.ordenBussiness.createOrden(data);
  }
}
