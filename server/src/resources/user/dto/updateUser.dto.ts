import { IsEnum, IsString } from 'class-validator';
import { UserTypeEnum } from '../enum/userType.enum';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsString()
  cpf: string;

  @IsEnum(UserTypeEnum)
  type: UserTypeEnum;
}
