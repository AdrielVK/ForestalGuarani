import { ApiProperty } from '@nestjs/swagger';
/* eslint-disable indent */
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePedidoDto {
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  fecha: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  proveedorId: number;
}
