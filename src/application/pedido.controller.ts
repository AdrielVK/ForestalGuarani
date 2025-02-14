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
import { CreatePedidoRequestDto } from 'src/bussiness/pedidos/dto/request.dto';
import { PedidosBussiness } from 'src/bussiness/pedidos/pedidos.bussines';
import {
  IPedidoEquipo,
  IPedidoResponse,
} from 'src/interfaces/pedidos.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoBussiness: PedidosBussiness) {}

  @Post('create')
  public async createCompletePedido(
    @Body(new ValidationPipe()) data: CreatePedidoRequestDto,
  ): Promise<ResponseInterface<IPedidoResponse>> {
    return await this.pedidoBussiness.createCompletePedido(data);
  }

  @Get('list')
  public async getListCompletePedidoByDate(): Promise<
    ResponseInterface<IPedidoEquipo[]>
    // eslint-disable-next-line indent
  > {
    return await this.pedidoBussiness.listCompletePedidoByDate();
  }

  @Get(':id')
  public async getCompletePedidoDetail(
    @Param('id', ParseIntPipe) id,
  ): Promise<ResponseInterface<IPedidoEquipo>> {
    console.log('id: ', id);
    return await this.pedidoBussiness.getCompletePedidoDetailt(id);
  }

  @Delete(':id')
  public async deleteCompletePedido(
    @Param('id', ParseIntPipe) id,
  ): Promise<ResponseInterface<{ message: string }>> {
    return await this.pedidoBussiness.deleteCompletePedido(id);
  }
}
