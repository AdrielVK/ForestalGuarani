import { ApiProperty } from '@nestjs/swagger';
/* eslint-disable indent */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProveedorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
