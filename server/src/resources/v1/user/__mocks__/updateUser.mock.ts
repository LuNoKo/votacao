import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserTypeEnum } from '../enum/userType.enum';

export const updateUserEntityMock: UpdateUserDto = {
  name: 'Test Name',
  type: UserTypeEnum.ADMIN,
};
