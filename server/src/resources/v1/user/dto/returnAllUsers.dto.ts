import { UserEntity } from '../entity/user.entity';

export class ReturnAllUserDto {
  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.cpf = user.cpf;
    this.type = user.type;
  }

  id: string;
  name: string;
  cpf: string;
  type: string;
}
