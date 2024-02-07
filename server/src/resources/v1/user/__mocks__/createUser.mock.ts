import { UserTypeEnum } from '../enum/userType.enum';
import { CreateUserDto } from '../dto/createUser.dto';

export const createUserMock: CreateUserDto = {
  name: 'Test Name',
  cpf: '123124',
  type: UserTypeEnum.ADMIN,
  password: 'passowrdTest',
};
