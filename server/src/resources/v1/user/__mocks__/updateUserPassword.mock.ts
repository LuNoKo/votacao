import { UpdateUserPasswordDto } from '../dto/updateUserPassword.dto';

export const updatePasswordMock: UpdateUserPasswordDto = {
  userId: '00000000-0000-0000-0000-000000000000',
  lastPassword: 'teste2',
  newPassword: 'fdsafj',
};

export const updatePasswordInvalidMock: UpdateUserPasswordDto = {
  userId: '00000000-0000-0000-0000-000000000000',
  lastPassword: 'lkfdjsa',
  newPassword: 'flkjbla',
};
