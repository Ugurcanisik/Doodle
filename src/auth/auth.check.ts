import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';

export const cookieCheck = createParamDecorator(
  (data = 'dt', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    try {
      jwt.verify(request.cookies.auth, jwtConstants.secret);
      return true;
    } catch (e) {
      return false;
    }
  },
);
