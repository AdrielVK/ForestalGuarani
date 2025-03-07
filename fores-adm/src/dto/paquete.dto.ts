import { ApiProperty } from '@nestjs/swagger';
/* eslint-disable indent */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaqueteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identificador: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  vol: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  estadoId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  piezaId: number;
}
