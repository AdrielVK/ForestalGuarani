import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/bussiness/auth/jwt.guard';
import { IngresosBussiness } from 'src/bussiness/ingresos/ingresos.bussines';
import { CreateCompleteIngresoDto } from 'src/dto/ingresos.dto';
import {
  ICreateIngresoResponse,
  IIngresoDetail,
  IIngresoDetailResponse,
} from 'src/interfaces/ingresos.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';

@Controller('ingresos')
export class IngresosController {
  constructor(private readonly ingresosBussiness: IngresosBussiness) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  public async createIngreso(
    @Body(new ValidationPipe()) data: CreateCompleteIngresoDto,
  ): Promise<ResponseInterface<ICreateIngresoResponse>> {
    return await this.ingresosBussiness.createCompleteIngreso(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  public async getIngresosList(): Promise<ResponseInterface<IIngresoDetail[]>> {
    return await this.ingresosBussiness.listIngresos();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async getIngresoDetail(
    @Param('id', ParseIntPipe) id,
  ): Promise<ResponseInterface<IIngresoDetailResponse>> {
    return await this.ingresosBussiness.getIngresoDetail(id);
  }
}
