import { Estado } from '../../../common';
import { UsuarioEntity } from '../../../usuarios/entity/usuarios.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reservas')
export class ReservaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: Estado })
  estado: Estado;

  @JoinColumn({ name: 'usuario_reserva' })
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.reservas, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  usuario: UsuarioEntity; // usuarioId
}
