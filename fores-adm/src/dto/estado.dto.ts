import { ApiProperty } from '@nestjs/swagger';
/* eslint-disable indent */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEstadoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string;
}
