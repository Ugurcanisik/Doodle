import { PartialType } from '@nestjs/mapped-types';

export class UpdateSettingDto {
  readonly title: string;
  readonly logo: string;
  readonly ico: string;
  readonly keywords: string;
  readonly description: string;
  readonly companyname: string;
  readonly id: string;
}
