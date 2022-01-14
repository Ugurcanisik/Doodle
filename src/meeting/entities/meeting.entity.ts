import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Meeting')
export class Meeting {
    @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  toplantiAdi: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  toplantiKonusu: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  toplantiSahibi: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  katilimcilar: string;

  @Column({ type: 'char', length: 300, nullable: true })
  toplantiZamani: string;

  @Column({ type: 'boolean', default: false })
  toplantiOkey: boolean;

  @Column({ type: 'boolean', default: false })
  toplantiBittimi: boolean;
  
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
