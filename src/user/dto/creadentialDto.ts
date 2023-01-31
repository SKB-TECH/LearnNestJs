import { IsNotEmpty, IsEmail } from 'class-validator';

export class CredentialDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
