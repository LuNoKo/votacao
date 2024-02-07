import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserTypeEnum } from '../enum/userType.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
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
    example: UserTypeEnum.ADMIN,
    description: 'Typo de usuário podendo ser administador ou usuario',
    enum: UserTypeEnum,
  })
  @IsNotEmpty()
  @IsEnum(UserTypeEnum)
  type: UserTypeEnum;
}
