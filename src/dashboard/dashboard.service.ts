import { Injectable } from '@nestjs/common';
import { SettingsService } from 'src/settings/settings.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly userService: UsersService,
    private readonly SettingsService: SettingsService,
  ) {}

  findUser(userid: string) {
    return this.userService.findOne(userid);
  }

  allSetting() {
    return this.SettingsService.findAll();
  }
}
