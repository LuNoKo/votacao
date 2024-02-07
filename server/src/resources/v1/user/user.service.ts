import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserPasswordDto } from './dto/updateUserPassword.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

import { RegisterUserDto } from './dto/RegisterUserDto.dto';
import { UserTypeEnum } from './enum/userType.enum';
import {
  createPasswordHashed,
  validatePassword,
} from '../../../common/utils/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async CreateUser(createUser: CreateUserDto): Promise<UserEntity> {
    const userExist = await this.GetOneUserByCpf(createUser.cpf).catch(
      () => undefined,
    );

    if (userExist) {
      throw new ConflictException(`Usuário já cadastrado`);
    }

    const passwordHashed = await createPasswordHashed(createUser.password);

    return this.userRepository.save({
      ...createUser,
      password: passwordHashed,
    });
  }

  async RegisterUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const userExist = await this.GetOneUserByCpf(registerUserDto.cpf).catch(
      () => undefined,
    );

    const userCount = await this.userRepository.count();

    if (userExist) {
      throw new ConflictException(`Usuário já cadastrado`);
    }

    const passwordHashed = await createPasswordHashed(registerUserDto.password);

    return this.userRepository.save({
      ...registerUserDto,
      type: userCount === 0 ? UserTypeEnum.ADMIN : UserTypeEnum.USER,
      password: passwordHashed,
    });
  }

  async GetAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find({
      where: { active: true },
      order: { name: 'ASC' },
    });

    if (!users || users.length === 0) {
      throw new NotFoundException('Usuários não encontrados');
    }

    return users;
  }

  async GetOneUserById(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId, active: true },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async GetOneUserByCpf(cpf: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { cpf, active: true },
    });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado para o cpf ${cpf}`);
    }

    return user;
  }

  async UpdateUser(
    updateUser: UpdateUserDto,
    userId: string,
  ): Promise<UserEntity> {
    const user = await this.GetOneUserById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.userRepository.save({
      ...user,
      ...updateUser,
    });
  }

  async UpdatePasswordUser(
    updatePasswordDTO: UpdateUserPasswordDto,
    userId: string,
  ): Promise<UserEntity> {
    const user = await this.GetOneUserById(userId);

    const passwordHashed = await createPasswordHashed(
      updatePasswordDTO.newPassword,
    );

    const isMatch = await validatePassword(
      updatePasswordDTO.lastPassword,
      user.password || '',
    );

    if (!isMatch) {
      throw new BadRequestException('Ultima senha inválida');
    }

    return this.userRepository.save({
      ...user,
      password: passwordHashed,
    });
  }

  async delete(userId: string) {
    const user = await this.GetOneUserById(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.userRepository.save({
      ...user,
      active: false,
    });
  }
}
