import { UserEntity } from '../entity/user.entity';
import { UserTypeEnum } from '../enum/userType.enum';

export const userEntityMock: UserEntity = {
  id: '00000000-0000-0000-0000-000000000000',
  name: 'Test Name',
  cpf: '123124',
  type: UserTypeEnum.ADMIN,
  active: true,
  password: '$2b$10$FqMpzsU4u5/15Zx70cFUqeqv4NkTfSHqEc7xZdfWvm2hgjdzWkkIq',
  createdAt: new Date(),
  updatedAt: new Date(),
  votes: [],
};
