import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SettingsService } from 'src/settings/settings.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private UsersRespository: Repository<User>,
    private readonly SettingsService: SettingsService,
  ) {}

  allSetting() {
    return this.SettingsService.findAll();
  }

  async create(CreateUserDto: CreateUserDto) {
    const newUser = await this.UsersRespository.create(CreateUserDto);
    return await this.UsersRespository.save(newUser);
  }

  async findAll() {
    return await this.UsersRespository.find({ where: { deleted: false } });
  }

  findOne(id: string) {
    return this.UsersRespository.findOne({ where: { id: id, deleted: false } });
  }

  findUsername(username: string) {
    return this.UsersRespository.findOne({
      where: { username: username, deleted: false },
    });
  }

  async update(UpdateUserDto) {
    return await this.UsersRespository.update(UpdateUserDto.id, UpdateUserDto);
  }

  remove(id: string) {
    return this.UsersRespository.update(id, { deleted: true });
  }


  findus(id){
    
  }
}
