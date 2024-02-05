import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserEntity } from '../entity/user.entity';
import { UserTypeEnum } from '../enum/userType.enum';

export const updateUserEntityMock: UpdateUserDto = {
  name: 'Test Name',
  cpf: '123124',
  type: UserTypeEnum.ADMIN,
};
