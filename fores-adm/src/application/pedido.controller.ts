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
  @UseGuards(JwtAuthGuard)
  @Post('create')
  public async createCompletePedido(
    @Body(new ValidationPipe()) data: CreatePedidoRequestDto,
  ): Promise<ResponseInterface<IPedidoResponse>> {
    return await this.pedidoBussiness.createCompletePedido(data);
  }
  @UseGuards(JwtAuthGuard)
  @Get('list')
  public async getListCompletePedidoByDate(): Promise<
    ResponseInterface<IPedidoEquipo[]>
    // eslint-disable-next-line indent
  > {
    return await this.pedidoBussiness.listCompletePedidoByDate();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async getCompletePedidoDetail(
    @Param('id', ParseIntPipe) id,
  ): Promise<ResponseInterface<IPedidoEquipo>> {
    return await this.pedidoBussiness.getCompletePedidoDetailt(id);
  }
  @UseGuards(JwtRoleEditorGuard)
  @Delete(':id')
  public async deleteCompletePedido(
    @Param('id', ParseIntPipe) id,
  ): Promise<ResponseInterface<{ message: string }>> {
    return await this.pedidoBussiness.deleteCompletePedido(id);
  }
}
