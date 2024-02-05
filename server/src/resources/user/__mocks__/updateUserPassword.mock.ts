import { UpdateUserPasswordDto } from '../dto/updateUserPassword.dto';

export const updatePasswordMock: UpdateUserPasswordDto = {
  lastPassword: 'teste2',
  newPassword: 'fdsafj',
};

export const updatePasswordInvalidMock: UpdateUserPasswordDto = {
  lastPassword: 'lkfdjsa',
  newPassword: 'flkjbla',
};
