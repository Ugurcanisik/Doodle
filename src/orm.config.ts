import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv/config');

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
};
