/* eslint-disable indent */
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCicloDto {
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  ingreso: Date;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  egreso?: Date;

  @IsInt()
  @IsOptional()
  paqueteId?: number;
}

export class AddEgresoCicloDto {
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  egreso: Date;

  @IsInt()
  @IsNotEmpty()
  id: number;
}
