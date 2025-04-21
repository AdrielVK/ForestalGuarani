import { Controller, Get, UseGuards } from '@nestjs/common';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { EstadoBusiness } from 'src/bussiness/estado/estado.business';
import { JwtAuthGuard } from 'src/bussiness/auth/jwt.guard';

@Controller('estado')
export class EstadoController {
  constructor(private readonly estadoBusiness: EstadoBusiness) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  public async listOfValues(): Promise<
    ResponseInterface<string[]>
    // eslint-disable-next-line indent
  > {
    return await this.estadoBusiness.listOfValues();
  }
}
