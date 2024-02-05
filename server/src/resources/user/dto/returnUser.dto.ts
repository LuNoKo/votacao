import { UserEntity } from '../entity/user.entity';

export class ReturnUserDto {
  constructor(user: UserEntity) {
    this.name = user.name;
    this.cpf = user.cpf;
    this.type = user.type;
  }

  name: string;
  cpf: string;
  type: string;
}
