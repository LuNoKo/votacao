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
import { Roles } from '../../common/decorators/roles.decorator';
import { UserTypeEnum } from './enum/userType.enum';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdateUserPasswordDto } from './dto/updateUserPassword.dto';
import { UserId } from '../../common/decorators/userId.decorator';
import { ReturnAllUserDto } from './dto/returnAllUsers.dto';
import { RegisterUserDto } from './dto/RegisterUserDto.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { authorizationToLoginPayload } from '../../common/utils/base64converter';

@ApiTags('user')
@Controller('user')
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
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.GetOneUserById(userId));
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
    @UserId() userId: string,
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.UpdatePasswordUser(updateUserPassword, userId),
    );
  }

  @Delete('/:userId')
  @Roles(UserTypeEnum.ADMIN)
  @ApiHeader(authorizationToLoginPayload)
  async delete(@Param('userId') userId: string) {
    return this.userService.delete(userId);
  }
}
