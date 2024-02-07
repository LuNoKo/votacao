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
    example: UserTypeEnum.ADMIN,
    description: 'Typo de usuário podendo ser administador ou usuario',
    enum: UserTypeEnum,
  })
  @IsNotEmpty()
  @IsEnum(UserTypeEnum)
  type: UserTypeEnum;
}
