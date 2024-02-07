import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { LoginPayloadDto } from './dto/loginPayload.dto';
import { validatePassword } from '../../../common/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async Login(login: LoginDto): Promise<ReturnLoginDto> {
    const user: UserEntity | undefined = await this.userService
      .GetOneUserByCpf(login.cpf)
      .catch(() => undefined);

    const isMatch = await validatePassword(
      login.password,
      user?.password || '',
    );

    if (!user || !isMatch) {
      throw new NotFoundException(`Cpf ou senha inválida`);
    }

    return {
      accessToken: this.jwtService.sign({
        ...new LoginPayloadDto(user),
      }),
      user: new LoginPayloadDto(user),
    };
  }

  async revalidate(loginPayload: LoginPayloadDto): Promise<ReturnLoginDto> {
    return {
      accessToken: this.jwtService.sign({
        ...loginPayload,
      }),
      user: { ...loginPayload },
    };
  }
}
