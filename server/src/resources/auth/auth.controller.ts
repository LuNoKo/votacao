import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ReturnLoginDto } from './dto/returnLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async Login(@Body() login: LoginDto): Promise<ReturnLoginDto> {
    return this.authservice.Login(login);
  }
}
