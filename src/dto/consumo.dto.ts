/* eslint-disable indent */
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateConsumoEntityDto {
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  fecha: Date;
  @IsNotEmpty()
  @IsNumber()
  planId: number;
  @IsNotEmpty()
  @IsNumber()
  equipoId: number;
}
