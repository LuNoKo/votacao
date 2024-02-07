import { UserEntity } from '../../user/entity/user.entity';

export class LoginPayloadDto {
  id: string;
  userType: string;
  firstName: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.userType = user.type;
    this.firstName = user.name.split(' ')[0];
  }
}
