/* eslint-disable indent */
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreatePlanProdEntityDto {
  @IsNotEmpty()
  @IsDate()
  fecha_inicio: Date;
  @IsNotEmpty()
  @IsDate()
  fecha_fin: Date;
  @IsNotEmpty()
  @IsNumber()
  esquemaId: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class CreatePlanProdBuilderDto {
  @IsNotEmpty()
  @IsDate()
  fecha_inicio: Date;
  @IsNotEmpty()
  @IsDate()
  fecha_fin: Date;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class CreatePlanRequestDto {
  @IsNotEmpty()
  @IsDate()
  fecha_inicio: Date;
  @IsNotEmpty()
  @IsDate()
  fecha_fin: Date;
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
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

export class AssociateConsumoToPlanDto {
  @IsNotEmpty()
  @IsNumber()
  planId: number;
  @IsNotEmpty()
  @IsNumber()
  consumoId: number;
}

export class ChangeStatusDto {
  @IsNotEmpty()
  @IsBoolean()
  value: boolean;
}

export class CreatePlanRequestControllerDto {
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  fecha_inicio: Date;
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  fecha_fin: Date;
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
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
