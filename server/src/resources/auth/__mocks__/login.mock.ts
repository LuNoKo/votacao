import { userEntityMock } from '../../user/__mocks__/user.mocks';
import { LoginDto } from '../dto/login.dto';

export const loginMock: LoginDto = {
  cpf: userEntityMock.cpf,
  password: 'teste2',
};
