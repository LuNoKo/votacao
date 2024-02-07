import { ReturnUserDto } from '../dto/returnUser.dto';
import { UserTypeEnum } from '../enum/userType.enum';

export const ReturnUserMock: ReturnUserDto = {
  cpf: '123124',
  name: 'Test Name',
  type: UserTypeEnum.ADMIN,
};
