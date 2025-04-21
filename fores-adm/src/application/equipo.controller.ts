import { Get, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from 'src/bussiness/auth/jwt.guard';
import { EquiposBussiness } from 'src/bussiness/equipo/equipo.bussiness';
import { IEquipoStock } from 'src/interfaces/equipo.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';

@Controller('equipo')
export class EquipoController {
  constructor(private equipoBussiness: EquiposBussiness) {}

  @UseGuards(JwtAuthGuard)
  @Get('list/stock')
  public async listEquiposStock(): Promise<ResponseInterface<IEquipoStock[]>> {
    return await this.equipoBussiness.listEquipoStock();
  }
}
