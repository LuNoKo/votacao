import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { createUserMock } from '../__mocks__/createUser.mock';
import { userEntityMock } from '../__mocks__/user.mocks';
import { updateUserEntityMock } from '../__mocks__/updateUser.mock';
import { updatePasswordMock } from '../__mocks__/updateUserPassword.mock';

//npm run test ./src/resources/user/test/user.controller.spec.ts
describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            CreateUser: jest.fn().mockResolvedValue(createUserMock),
            GetOneUserById: jest.fn().mockResolvedValue(createUserMock),
            GetAllUsers: jest.fn().mockResolvedValue([createUserMock]),
            UpdateUser: jest.fn().mockResolvedValue(createUserMock),
            UpdatePasswordUser: jest.fn().mockResolvedValue(createUserMock),
          },
        },
      ],
      controllers: [UserController],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('CreateUser', () => {
    it('should return user in CreateUser', async () => {
      const user = await userController.CreateUser(createUserMock);

      expect(user).toEqual({
        cpf: userEntityMock.cpf,
        name: userEntityMock.name,
        type: userEntityMock.type,
      });
    });
  });

  describe('GetOneUserById', () => {
    it('should return user in GetOneUserById', async () => {
      const user = await userController.GetOneUserById(userEntityMock.id);

      expect(user).toEqual({
        cpf: userEntityMock.cpf,
        name: userEntityMock.name,
        type: userEntityMock.type,
      });
    });
  });

  describe('GetAllUsers', () => {
    it('should return array of users in GetAllUsers', async () => {
      const users = await userController.GetAllUsers();

      expect(users).toEqual([
        {
          name: userEntityMock.name,
          cpf: userEntityMock.cpf,
          type: userEntityMock.type,
        },
      ]);
    });
  });

  describe('UpdateUser', () => {
    it('should return users in UpdateUser', async () => {
      const users = await userController.UpdateUser(
        updateUserEntityMock,
        userEntityMock.id,
      );

      expect(users).toEqual(updateUserEntityMock);
    });
  });

  describe('UpdatePasswordUser', () => {
    it('should return users in UpdatePasswordUser', async () => {
      const users = await userController.UpdatePasswordUser(
        updatePasswordMock,
        userEntityMock.id,
      );

      expect(users).toEqual(updateUserEntityMock);
    });
  });
});
