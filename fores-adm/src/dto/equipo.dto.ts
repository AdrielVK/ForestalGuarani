import { ApiProperty } from '@nestjs/swagger';
/* eslint-disable indent */
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEquipoDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pedidoId?: number;
}
