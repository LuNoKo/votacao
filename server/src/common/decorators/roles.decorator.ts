import { SetMetadata } from '@nestjs/common';
import { UserTypeEnum } from 'src/resources/v1/user/enum/userType.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserTypeEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
