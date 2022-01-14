import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Res,
  UnprocessableEntityException,
  UsePipes,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/auth/constants';
import { JoiValidationPipe } from 'src/joi.validator';
import addUserValid from './dto/validators/add.users.valid';
import updateUserValid from './dto/validators/update.users.valid';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async index(@Res() res, @Req() req) {
    return res.render('users', {
      user: req.user,
      allSetting: await this.usersService.allSetting(),
    });
  }

  @Post('add')
  // @UsePipes(new JoiValidationPipe(addUserValid))
  async create(@Body() CreateUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();


    const newPassword = await bcrypt.hash(CreateUserDto.password, salt);

    CreateUserDto.password = newPassword;
    const newUser = await this.usersService
      .create(CreateUserDto)
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
  }

  @Post('list')
  async allUsers() {
    const allUsers = await this.usersService.findAll();
    const dataArray = [];

    allUsers.forEach(function (key, value) {
      const simple = {
        name: key.name,
        lastname: key.lastname,
        username: key.username,
        id: key.id,
      };

      dataArray.push(simple);
    });

    return {
      data: dataArray,
    };
  }

  @Post('update')
  findandfetch(@Body('id') id: string) {
    return this.usersService
      .findOne(id)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        return e;
      });
  }

  @Patch('update')
  async update(@Body() UpdateUserDto: UpdateUserDto) {

    const token = await jwt.sign(
      { id: UpdateUserDto.id, fullName: UpdateUserDto.name + ' ' + UpdateUserDto.lastname, yetki:UpdateUserDto.yetki },
      jwtConstants.secret,
    );

    UpdateUserDto.token = token

    const upToken = await this.usersService.update(UpdateUserDto);


  }

  @Delete('delete')
  remove(@Body('id') id: string) {
    return this.usersService.remove(id);
  }
}
