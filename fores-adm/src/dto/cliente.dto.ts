/* eslint-disable indent */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  numero: string;
}

export class GetOrCreateClienteDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsNotEmpty()
  numero: string;
}
