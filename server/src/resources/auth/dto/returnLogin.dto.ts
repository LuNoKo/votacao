import { LoginPayloadDto } from './loginPayload.dto';

export class ReturnLoginDto {
  user: LoginPayloadDto;
  accessToken: string;
}
