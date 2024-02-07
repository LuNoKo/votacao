import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserPasswordDto {
  @ApiProperty({
    example: '00000000-0000-0000-0000-000000000000',
    description:
      'UserId  utilizado identificar qual usuário deverá ser realizado a alteração da senha',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    example: '00000',
    description:
      'LastPassword é a senha anterior utilizada para realizar autenticação na aplicação',
  })
  @IsNotEmpty()
  @IsString()
  lastPassword: string;

  @ApiProperty({
    example: '12345',
    description:
      'NewPassword é a senha nova para realizar autenticação na aplicação',
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
