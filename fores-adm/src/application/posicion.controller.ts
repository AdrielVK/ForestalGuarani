import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { PosicionBussiness } from 'src/bussiness/posicion/posicion.bussines';
import { CreatePosicionDto } from 'src/dto/posicion.dto';
import {
  IPosicion,
  IPosicionResponse,
  IPosicionStock,
} from 'src/interfaces/posicion.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';

@Controller('posicion')
export class PosicionController {
  constructor(private posicionBussines: PosicionBussiness) {}

  @Get('count')
  public async countPosiciones(): Promise<ResponseInterface<number>> {
    return await this.posicionBussines.countPosiciones();
  }

  @Get('list')
  public async listPosiciones(): Promise<ResponseInterface<IPosicion[]>> {
    return await this.posicionBussines.listPosicion();
  }

  @Get('list/stock')
  public async listPosicionesStock(): Promise<
    ResponseInterface<IPosicionStock[]>
    // eslint-disable-next-line indent
  > {
    return await this.posicionBussines.listPosicionStock();
  }

  @Post('create')
  public async createPosicion(
    @Body(new ValidationPipe()) data: CreatePosicionDto,
  ): Promise<ResponseInterface<IPosicionResponse>> {
    return await this.posicionBussines.createPosicion(data.identificador);
  }

  @Delete('delete/:id')
  public async deletePosicion(
    @Param('id', ParseIntPipe) id,
  ): Promise<ResponseInterface<{ message: string }>> {
    return await this.posicionBussines.deletePosicion(id);
  }

  @Patch('patch/:id')
  public async setFreePosicion(
    @Param('id', ParseIntPipe) id,
  ): Promise<ResponseInterface<IPosicionResponse>> {
    console.log(id);
    return await this.posicionBussines.setFreePosicion(id);
  }
}
