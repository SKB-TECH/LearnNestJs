import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AddTodosDto {
  @IsNotEmpty()
  @Type(() => Number)
  name: string;
  description: string;
}
