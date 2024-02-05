import { UserEntity } from '../entity/user.entity';

export class LoginUserDto {
  constructor(user: UserEntity) {
    this.name = user.name;
    this.type = user.type;
  }

  name: string;
  type: string;
}
