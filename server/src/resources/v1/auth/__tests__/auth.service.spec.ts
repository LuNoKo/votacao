import { JwtService } from '@nestjs/jwt';
import { expect } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/__mocks__/user.mocks';
import { AuthService } from '../auth.service';
import { jwtMock } from '../__mocks__/jwt.mock';
import { loginMock } from '../__mocks__/login.mock';
import { NotFoundException } from '@nestjs/common';
import { LoginPayloadDto } from '../dto/loginPayload.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            GetOneUserByCpf: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('AuthService', () => {
    it('should return user if password and email valid in AuthService', async () => {
      const user = await service.Login(loginMock);

      expect(user).toEqual({
        accessToken: jwtMock,
        user: new LoginPayloadDto(userEntityMock),
      });
    });

    it('should not return user if password invalid and cpf valid in AuthService', async () => {
      expect(service.Login({ ...loginMock, password: '4324' })).rejects.toThrow(
        new NotFoundException(`Cpf ou senha inválida`),
      );
    });

    it('should not return user if cpf not exist in AuthService', async () => {
      jest.spyOn(userService, 'GetOneUserByCpf').mockRejectedValue(undefined);

      expect(service.Login(loginMock)).rejects.toThrow(
        new NotFoundException(`Cpf ou senha inválida`),
      );
    });

    it('should return error in UserService in AuthService', async () => {
      jest.spyOn(userService, 'GetOneUserByCpf').mockRejectedValue(new Error());

      expect(service.Login(loginMock)).rejects.toThrow(
        new NotFoundException(`Cpf ou senha inválida`),
      );
    });
  });
});
