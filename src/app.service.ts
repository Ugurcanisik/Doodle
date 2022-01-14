import { Injectable } from '@nestjs/common';

import { SettingsService } from './settings/settings.service';

@Injectable()
export class AppService {
  constructor(
    private readonly settingService: SettingsService,
  ) {}

  allSetting() {
    return this.settingService.findAll();
  }


}
