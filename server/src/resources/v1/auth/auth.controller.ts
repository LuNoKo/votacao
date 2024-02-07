import {
  Body,
  Controller,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenData } from '../../../common/decorators/accessTokenData.decorator';
import { LoginPayloadDto } from './dto/loginPayload.dto';

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async Login(@Body() login: LoginDto): Promise<ReturnLoginDto> {
    return this.authservice.Login(login);
  }

  @Patch('revalidate')
  @UsePipes(ValidationPipe)
  async RevalidateLogin(
    @AccessTokenData() loginPayload: LoginPayloadDto,
  ): Promise<ReturnLoginDto> {
    return this.authservice.revalidate(loginPayload);
  }
}
