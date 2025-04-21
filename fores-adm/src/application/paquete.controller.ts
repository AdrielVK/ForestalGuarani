/* eslint-disable indent */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard, JwtRoleEditorGuard } from 'src/bussiness/auth/jwt.guard';
import { PaqueteBussiness } from 'src/bussiness/paquete/paquete.bussiness';
import {
  CreateCompletePaqueteDto,
  EditPaqueteRequestDto,
  ValidarIdentificadorPipe,
} from 'src/dto/paquete.dto';
import {
  IPaqueteDetails,
  IPaqueteForCiclo,
  IPaqueteReducedDetails,
} from 'src/interfaces/paquete.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';

@Controller('paquete')
export class PaqueteController {
  constructor(private readonly paqueteBussiness: PaqueteBussiness) {}
  @UseGuards(JwtAuthGuard)
  @Get('identificador/:identificador')
  public async existsIdentificador(
    @Param('identificador', ValidarIdentificadorPipe) identificador: string,
  ): Promise<ResponseInterface<boolean>> {
    return this.paqueteBussiness.existsIdentificador(identificador);
  }
  @UseGuards(JwtAuthGuard)
  @Post('create')
  public async createPaquete(
    @Body(new ValidationPipe()) data: CreateCompletePaqueteDto,
  ): Promise<
    ResponseInterface<{ message: string; response: IPaqueteDetails }>
  > {
    return await this.paqueteBussiness.createPaquete(data);
  }
  @UseGuards(JwtAuthGuard)
  @Get('detail/:id')
  public async getPaqueteDetails(
    @Param('id', ParseIntPipe) id,
  ): Promise<ResponseInterface<IPaqueteDetails>> {
    return await this.paqueteBussiness.getPaqueteDetails(id);
  }
  @UseGuards(JwtRoleEditorGuard)
  @Delete('delete/:id')
  public async deletePaquete(
    @Param('id', ParseIntPipe) id,
  ): Promise<ResponseInterface<{ message: string }>> {
    return await this.paqueteBussiness.deletePaquete(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('list')
  public async listPaquetes(): Promise<ResponseInterface<IPaqueteDetails[]>> {
    return await this.paqueteBussiness.listPaquetes();
  }
  @UseGuards(JwtAuthGuard)
  @Get('list/free')
  public async listPaquetesFree(): Promise<
    ResponseInterface<IPaqueteReducedDetails[]>
  > {
    return await this.paqueteBussiness.listPaquetesFree();
  }
  @UseGuards(JwtAuthGuard)
  @Get('list/free/ciclo')
  public async listPaquetesFreeOfCiclo(): Promise<
    ResponseInterface<IPaqueteForCiclo[]>
  > {
    return await this.paqueteBussiness.listPaquetesFreeOfCiclo();
  }
  @UseGuards(JwtAuthGuard)
  @Patch('edit/estado')
  public async editEstadoOfPaquete(
    @Body(new ValidationPipe()) data: EditPaqueteRequestDto,
  ): Promise<ResponseInterface<{ message: string }>> {
    return await this.paqueteBussiness.editEstadoPaquete(data);
  }
}
