import { IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsString()
  cpf: string;

  @IsString()
  password: string;
}
