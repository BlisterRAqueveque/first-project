import { ReservaEntity } from 'src/reservas/reservas/entity/reservas.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  nombre: string;

  @Column({ type: 'varchar', nullable: false, unique: true, length: 255 })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  password: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  avatar: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @OneToMany(() => ReservaEntity, (reservas) => reservas.usuario)
  reservas: ReservaEntity[];
}
