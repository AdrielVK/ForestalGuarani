/* eslint-disable indent */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrdenRequestDto {
  @IsNotEmpty()
  @IsString()
  numero: string;

  @IsNotEmpty()
  @IsNumber()
  volumen: number;

  @IsNotEmpty()
  @IsString()
  cabadoNombre: string;

  @IsOptional()
  @IsString()
  clienteNombre?: string;

  @IsNotEmpty()
  @IsString()
  clienteNumero: string;
}

export class CreateOrdenProdDto {
  @IsNotEmpty()
  @IsString()
  numero: string;

  @IsNotEmpty()
  @IsNumber()
  volumen: number;

  @IsNotEmpty()
  @IsNumber()
  cabadoId: number;

  @IsNotEmpty()
  @IsNumber()
  clienteId: number;

  @IsNotEmpty()
  @IsNumber()
  planId?: number;
}

export class CreateBuilderOrdenProdDto {
  @IsNotEmpty()
  @IsString()
  numero: string;

  @IsNotEmpty()
  @IsNumber()
  volumen: number;

  @IsNotEmpty()
  @IsNumber()
  planId?: number;
}

export class AssociateToPlanDto {
  @IsNotEmpty()
  @IsNumber()
  planId: number;
  @IsNotEmpty()
  @IsNumber()
  ordenId: number;
}
