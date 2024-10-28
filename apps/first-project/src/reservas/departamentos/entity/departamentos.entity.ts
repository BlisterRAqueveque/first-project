import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('departamentos')
export class DepartamentoEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: true })
  nombre: string;

  @Column({ type: 'int', default: 0 })
  precio: number;
}
