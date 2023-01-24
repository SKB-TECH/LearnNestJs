import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  MAX_LENGTH,
  Max,
  MaxLength,
  isIn,
  isNumber,
  max,
  maxLength,
} from 'class-validator';

//une image de la classe to do
export class Todo {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  createdAd: Date;

  // @IsNotEmpty()
  // @IsIn(['a', 'b'])
  // status;
  // @MaxLength(12, {
  //   message: 'La taille doit etre superieur a 13',
  // })
  // view;
}
