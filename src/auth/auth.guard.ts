import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';

@Injectable()
export class CookieAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const Response = context.switchToHttp().getResponse();

    // console.log(request.cookies.auth)

    if (request.url === '/login' || request.url == '/' || request.url == '/uyeol') {
      return true;
    }

    try {
      const decoded = jwt.verify(request.cookies.auth, jwtConstants.secret);
      // console.log(decoded)
      request.user = decoded;
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
