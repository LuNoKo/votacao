import { Test, TestingModule } from '@nestjs/testing';
import { expect } from '@jest/globals';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../__mocks__/user.mocks';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { createUserMock } from '../__mocks__/createUser.mock';
import { returnDeleteMock } from '../../../__mocks__/returnDete.mock';
import { updateUserEntityMock } from '../__mocks__/updateUser.mock';
import {
  updatePasswordInvalidMock,
  updatePasswordMock,
} from '../__mocks__/updateUserPassword.mock';
import { registerUserMock } from '../__mocks__/registerUser.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([userEntityMock]),
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('CreateUser', () => {
    it('should return user if user not exist in CreateUser', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      const user = await service.CreateUser(createUserMock);

      expect(user).toEqual(userEntityMock);
    });

    it('should return error if user exist in CreateUser', async () => {
      expect(service.CreateUser(createUserMock)).rejects.toThrow(
        new ConflictException(`Usuário já cadastrado`),
      );
    });
  });

  describe('GetAllUsers', () => {
    it('should return all users in GetAllUsers', async () => {
      expect(await service.GetAllUsers()).toEqual([userEntityMock]);
    });

    it('should return error if products empty', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue([]);

      expect(service.GetAllUsers()).rejects.toThrow();
    });

    it('should return error in exception', async () => {
      jest.spyOn(userRepository, 'find').mockRejectedValue(new Error());

      expect(service.GetAllUsers()).rejects.toThrow();
    });
  });

  describe('GetOneUserByCpf', () => {
    it('should return user in GetOneUserByCpf', async () => {
      const user = await service.GetOneUserByCpf(userEntityMock.cpf);

      expect(user).toEqual(userEntityMock);
    });

    it('should return error in GetOneUserByCpf', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      expect(service.GetOneUserByCpf(userEntityMock.cpf)).rejects.toThrow(
        new NotFoundException(
          `Usuário não encontrado para o cpf ${userEntityMock.cpf}`,
        ),
      );
    });

    it('should return error in GetOneUserByCpf (DataBase Error)', async () => {
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

      expect(service.GetOneUserByCpf(userEntityMock.cpf)).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('GetOneUserById', () => {
    it('should return user in GetOneUserById', async () => {
      const user = await service.GetOneUserById(userEntityMock.id);

      expect(user).toEqual(userEntityMock);
    });

    it('should return error in GetOneUserById', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      expect(service.GetOneUserById(userEntityMock.id)).rejects.toThrow(
        new NotFoundException('Usuário não encontrado'),
      );
    });

    it('should return error in GetOneUserById (DataBase Error)', async () => {
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

      expect(service.GetOneUserById(userEntityMock.cpf)).rejects.toThrow(
        new Error(),
      );
    });
  });

  describe('UpdateUser', () => {
    it('should return user updated in UpdateUser', async () => {
      const user = await service.UpdateUser(
        updateUserEntityMock,
        userEntityMock.id,
      );

      expect(user).toEqual(userEntityMock);
    });

    it('should return error in UpdateUser', async () => {
      jest.spyOn(userRepository, 'save').mockRejectedValue(new Error());

      expect(
        service.UpdateUser(updateUserEntityMock, userEntityMock.id),
      ).rejects.toThrow(new Error());
    });
  });

  describe('UpdateUserPassword', () => {
    it('should return user in UpdateUserPassword', async () => {
      const user = await service.UpdatePasswordUser(
        updatePasswordMock,
        userEntityMock.id,
      );

      expect(user).toEqual(userEntityMock);
    });

    it('should return invalid password in error in UpdateUserPassword', async () => {
      expect(
        service.UpdatePasswordUser(
          updatePasswordInvalidMock,
          userEntityMock.id,
        ),
      ).rejects.toThrow(new BadRequestException('Ultima senha inválida'));
    });

    it('should return error in user not exist', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      expect(
        service.UpdatePasswordUser(updatePasswordMock, userEntityMock.id),
      ).rejects.toThrow(new NotFoundException('Usuário não encontrado'));
    });
  });

  describe('RegisterUser', () => {
    it('should return user if user not exist in RegisterUser', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      const user = await service.RegisterUser(registerUserMock);

      expect(user).toEqual(userEntityMock);
    });

    it('should return error if user exist in RegisterUser', async () => {
      expect(service.RegisterUser(registerUserMock)).rejects.toThrow(
        new ConflictException(`Usuário já cadastrado`),
      );
    });
  });
});
