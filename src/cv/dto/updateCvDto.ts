import { mixin } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateCvDto {
  @IsNotEmpty({
    message: 'name ne doit pas etre vide ',
  })
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty({
    message: 'firstname ne doit pas etre vide ',
  })
  @IsString()
  @IsOptional()
  firstname: string;

  @Type(() => Number)
  @IsNotEmpty({
    message: 'age ne doit pas etre vide ',
  })
  @IsNumber()
  @Min(15)
  @Max(65)
  @IsOptional()
  age: number;

  @IsNotEmpty({
    message: 'cin ne doit pas etre vide ',
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  cin: number;

  @IsNotEmpty({
    message: 'job ne doit pas etre vide ',
  })
  @IsString()
  @IsOptional()
  job: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  path: string;
}
