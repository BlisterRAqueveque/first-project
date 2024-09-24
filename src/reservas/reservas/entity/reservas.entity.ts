import { Estado } from 'src/common';
import { UsuarioDto } from 'src/usuarios/dto/usuarios.dto';
import { UsuarioEntity } from 'src/usuarios/entity/usuarios.entity';
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
