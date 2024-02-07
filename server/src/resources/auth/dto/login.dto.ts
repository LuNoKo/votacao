import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
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
