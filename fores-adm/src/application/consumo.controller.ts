import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ConsumoBussiness } from 'src/bussiness/consumo/consumo.bussiness';
import { CreateConsumoEntityDto } from 'src/dto/consumo.dto';
import { IConsumo } from 'src/interfaces/consumo.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';

@Controller('consumo')
export class ConsumoController {
  constructor(private readonly consumoBussiness: ConsumoBussiness) {}

  @Post('create')
  public async createConsumo(
    @Body(new ValidationPipe()) data: CreateConsumoEntityDto,
  ): Promise<
    ResponseInterface<{ response: Omit<IConsumo, 'plan'>; message: string }>
  > {
    return await this.consumoBussiness.createConsumo(data);
  }
}
