import { Injectable } from '@nestjs/common';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting) private SettingRepository: Repository<Setting>,
  ) {}

  async findAll() {
    const allSetting = await this.SettingRepository.find({
      where: { deleted: false },
    });
    return allSetting[0];
  }

  update(updateSettingDto: UpdateSettingDto) {
    return this.SettingRepository.update(updateSettingDto.id, updateSettingDto);
  }
}
