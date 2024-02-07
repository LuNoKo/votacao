import { Test, TestingModule } from '@nestjs/testing';
import { expect } from '@jest/globals';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { loginMock } from '../__mocks__/login.mock';
import { loginUserMock } from '../../user/__mocks__/loginUser.mock';
import { jwtMock } from '../__mocks__/jwt.mock';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            Login: jest.fn().mockResolvedValue({
              user: loginUserMock,
              accessToken: jwtMock,
            }),
          },
        },
      ],
      controllers: [AuthController],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('Login', () => {
    it('should return user with accessToken in GetOneUserById', async () => {
      expect(await authController.Login(loginMock)).toEqual({
        user: loginUserMock,
        accessToken: jwtMock,
      });
    });
  });
});
