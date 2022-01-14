import { Body, Controller, Get, Post, Res, UnprocessableEntityException } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { cookieCheck } from './auth/auth.check';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users/users.service';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './auth/constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Get()
  async index(@Res() res) {
    res.redirect('/login');
  }

  @Get('uyeol')
  async uyeolform(@Res() res) {
    res.render('uyeol');
  }

  @Get('login')
  loginIndex(@Res() res, @cookieCheck() cookieCheck) {
    if (cookieCheck) {
      res.redirect('/dashboard');
    } else {
      res.render('login');
    }
  }


  @Post('uyeol')
  async uyeol(@Body() payload){
    const salt = await bcrypt.genSalt();

    const newPassword = await bcrypt.hash(payload.password, salt);

    payload.password = newPassword;
    payload.yetki = 0

    const newUser = await this.usersService
      .create(payload)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        throw new UnprocessableEntityException('name must be unique');
      });

    const token = await jwt.sign(
      { id: newUser.id, fullName: newUser.name + ' ' + newUser.lastname, yetki:newUser.yetki },
      jwtConstants.secret,
    );

    const upUser = { id: newUser.id, token: token };

    const upToken = await this.usersService.update(upUser);

    return true
  }

  @Post('login')
  async login(@Body() body, @Res({ passthrough: true }) res) {
    const token = await this.authService.validateUser(body);

    if (token['status'] != 404) {
      res.cookie('auth', token, { maxAge: 60 * 60 * 24 * 1000 });
      return true;
    } else {
      return false;
    }
  }

  @Get('logout')
  async logout(@Res() res, @cookieCheck() cookieCheck) {
    if (cookieCheck) {
      await res.clearCookie('auth');
      res.redirect('/login');
    } else {
      res.render('login');
    }
  }
}
