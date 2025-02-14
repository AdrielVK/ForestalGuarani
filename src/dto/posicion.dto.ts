/* eslint-disable indent */
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePosicionDto {
  @IsNotEmpty()
  @IsNumber()
  identificador: number;
}
