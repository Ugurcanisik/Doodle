import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Meeting } from './meeting.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('toplantiDurumlari')
export class toplantiDurumlari {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Meeting, (meeting) => meeting.id)
  toplantiId: string;

  @ManyToOne((type) => User, (user) => user.id)
  katilimciId: string;

  @Column({ type: 'char', length: 300, nullable: true })
  seciliZaman: string;

  @Column({ type: 'boolean', default: false })
  katilimDurumu: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  oylama: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
