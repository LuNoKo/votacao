import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { authorizationToLoginPayload } from '../utils/base64converter';

export const AccessTokenData = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const { authorization } = ctx.switchToHttp().getRequest().headers;

    const loginPayload = authorizationToLoginPayload(authorization);

    return {
      id: loginPayload?.id,
      firstName: loginPayload?.firstName,
      userType: loginPayload?.userType,
    };
  },
);
