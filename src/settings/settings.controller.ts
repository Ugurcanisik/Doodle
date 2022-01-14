import { Controller, Get, Body, Patch, Res, Req } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async index(@Res() res, @Req() req) {
    return res.render('settings', {
      user: req.user,
      allSetting: await this.settingsService.findAll(),
    });
  }

  @Patch('update')
  update(@Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.update(updateSettingDto);
  }
}
