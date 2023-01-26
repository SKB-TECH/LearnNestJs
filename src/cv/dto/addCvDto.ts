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

export class AddCvDto {
  @IsNotEmpty({
    message: 'name ne doit pas etre vide ',
  })
  @IsString()
  name: string;

  @IsNotEmpty({
    message: 'firstname ne doit pas etre vide ',
  })
  @IsString()
  firstname: string;

  @Type(() => Number)
  @IsNotEmpty({
    message: 'age ne doit pas etre vide ',
  })
  @IsNumber()
  @Min(15)
  @Max(65)
  age: number;

  @IsNotEmpty({
    message: 'cin ne doit pas etre vide ',
  })
  @Type(() => Number)
  @IsNumber()
  cin: number;

  @IsNotEmpty({
    message: 'job ne doit pas etre vide ',
  })
  @IsString()
  job: string;

  @IsOptional()
  @IsString()
  path: string;
}
