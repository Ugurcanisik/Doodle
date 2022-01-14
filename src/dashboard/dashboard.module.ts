import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { UsersModule } from 'src/users/users.module';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [UsersModule,SettingsModule],
})
export class DashboardModule {}
