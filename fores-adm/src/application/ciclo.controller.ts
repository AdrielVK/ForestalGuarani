import { ICicloDetails } from './../interfaces/ciclo.interface';
import { CicloBusiness } from './../bussiness/ciclo/ciclo.business';
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
import { AddEgresoCicloDto, CreateCicloDto } from 'src/dto/ciclo.dto';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { JwtAuthGuard, JwtRoleEditorGuard } from 'src/bussiness/auth/jwt.guard';

@Controller('ciclo')
export class CicloController {
  constructor(private readonly cicloBussiness: CicloBusiness) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  public async createCiclo(
    @Body(new ValidationPipe()) data: CreateCicloDto,
  ): Promise<ResponseInterface<{ message: string }>> {
    return await this.cicloBussiness.createCiclo(data);
  }

  @UseGuards(JwtRoleEditorGuard)
  @Delete('delete/:id')
  public async deleteCilo(
    @Param('id', ParseIntPipe) id,
  ): Promise<ResponseInterface<{ message: string }>> {
    return await this.cicloBussiness.deleteCiclo(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('edit/egreso')
  public async setEgreso(
    @Body(new ValidationPipe()) data: AddEgresoCicloDto,
  ): Promise<ResponseInterface<{ message: string }>> {
    return await this.cicloBussiness.setEgreso(data);
  }

  /*@Get('detail/:id')
  public async getPaqueteDetails(
    @Param('id', ParseIntPipe) id,
  ): Promise<ResponseInterface<IPaqueteDetails>> {
    return await this.paqueteBussiness.getPaqueteDetails(id);
  }*/

  @UseGuards(JwtAuthGuard)
  @Get('list')
  public async listCiclos(): Promise<
    ResponseInterface<ICicloDetails[]>
    // eslint-disable-next-line indent
  > {
    return await this.cicloBussiness.listCiclos();
  }
}
