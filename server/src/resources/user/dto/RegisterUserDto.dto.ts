import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'Lucas',
    description: 'Nome do usuário utilizado somente para organização',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '896.425.900-93',
    description: 'CPF é utilizado para realizar autenticação na aplicação',
  })
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @ApiProperty({
    example: '12345',
    description: 'Password é utilizado para realizar autenticação na aplicação',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
