import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class subscribeDTO {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
