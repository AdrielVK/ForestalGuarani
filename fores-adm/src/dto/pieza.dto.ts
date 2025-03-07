import { ApiProperty } from '@nestjs/swagger';
/* eslint-disable indent */
import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePiezaDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  volumen: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  espesor: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  longitud: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  ancho: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  escuadriaId: number;
}
