import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserPasswordDto {
  @ApiProperty({
    example: '00000',
    description:
      'LastPassword é a seha anterior utilizada para realizar autenticação na aplicação',
  })
  @IsNotEmpty()
  @IsString()
  lastPassword: string;

  @ApiProperty({
    example: '12345',
    description:
      'NewPassword é a seha nova para realizar autenticação na aplicação',
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
