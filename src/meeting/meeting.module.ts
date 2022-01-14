import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/orm.config';
import { Meeting } from './entities/meeting.entity';
import { SettingsModule } from 'src/settings/settings.module';
import { toplantiDurumlari } from './entities/toplantiDurumlari.entity';

@Module({
  imports:[UsersModule,
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Meeting]),
    TypeOrmModule.forFeature([toplantiDurumlari]),
    SettingsModule],
  controllers: [MeetingController],
  providers: [MeetingService]
})
export class MeetingModule {}
