import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { ReturnUserDto } from './dto/returnUser.dto';

import { UserTypeEnum } from './enum/userType.enum';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdateUserPasswordDto } from './dto/updateUserPassword.dto';

import { ReturnAllUserDto } from './dto/returnAllUsers.dto';
import { RegisterUserDto } from './dto/registerUserDto.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { authorizationToLoginPayload } from '../../../common/utils/base64converter';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserId } from '../../../common/decorators/userId.decorator';

@ApiTags('user')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiHeader(authorizationToLoginPayload)
  @Roles(UserTypeEnum.ADMIN)
  @UsePipes(ValidationPipe)
  async CreateUser(@Body() createUser: CreateUserDto): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.CreateUser(createUser));
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async RegisterUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.RegisterUser(registerUserDto),
    );
  }

  @Get()
  @Roles(UserTypeEnum.ADMIN)
  @ApiHeader(authorizationToLoginPayload)
  async GetAllUsers(): Promise<ReturnAllUserDto[]> {
    return (await this.userService.GetAllUsers()).map(
      (userEntity) => new ReturnAllUserDto(userEntity),
    );
  }

  @Get(':userId')
  @Roles(UserTypeEnum.ADMIN)
  @ApiHeader(authorizationToLoginPayload)
  async GetOneUserById(
    @Param(':userId') userId: string,
  ): Promise<ReturnAllUserDto> {
    return new ReturnAllUserDto(await this.userService.GetOneUserById(userId));
  }

  @Put('/:userId')
  @Roles(UserTypeEnum.ADMIN)
  @UsePipes(ValidationPipe)
  @ApiHeader(authorizationToLoginPayload)
  async UpdateUser(
    @Body() updateUser: UpdateUserDto,
    @Param('userId') userId: string,
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.UpdateUser(updateUser, userId),
    );
  }

  @Patch()
  @Roles(UserTypeEnum.ADMIN)
  @UsePipes(ValidationPipe)
  @ApiHeader(authorizationToLoginPayload)
  async UpdatePasswordUser(
    @Body() updateUserPassword: UpdateUserPasswordDto,
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.UpdatePasswordUser(updateUserPassword),
    );
  }

  @Delete('/:userId')
  @Roles(UserTypeEnum.ADMIN)
  @ApiHeader(authorizationToLoginPayload)
  async delete(@Param('userId') userId: string) {
    return this.userService.delete(userId);
  }
}
