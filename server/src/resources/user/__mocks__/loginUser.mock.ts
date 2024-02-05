import { UserTypeEnum } from '../enum/userType.enum';
import { LoginUserDto } from '../dto/loginUser.dto';

export const loginUserMock: LoginUserDto = {
  name: 'Test Name',
  type: UserTypeEnum.ADMIN,
};
