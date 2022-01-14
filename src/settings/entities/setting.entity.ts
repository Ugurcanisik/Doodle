import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Setting')
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  keywords: string;

  @Column({ type: 'varchar', length: 300 })
  logo: string;

  @Column({ type: 'varchar', length: 300 })
  ico: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'varchar', length: 100 })
  companyname: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
