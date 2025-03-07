import { ApiProperty } from '@nestjs/swagger';
/* eslint-disable indent */
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEscuadriaDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  altura: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  longitud: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  ancho: number;
}

export class FindByPropsEscuadriaDto extends CreateEscuadriaDto {}
