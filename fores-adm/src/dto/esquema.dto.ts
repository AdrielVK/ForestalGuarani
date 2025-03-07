/* eslint-disable indent */
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEsquemaEntityDto {
  @IsNotEmpty()
  @IsNumber()
  longitud: number;
  @IsNotEmpty()
  @IsNumber()
  ancho: number;
  @IsNotEmpty()
  @IsNumber()
  espesor: number;
}

export class FindEsquemaByProps extends CreateEsquemaEntityDto {}
