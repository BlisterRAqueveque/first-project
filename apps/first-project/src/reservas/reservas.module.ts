import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MAILER_MS } from '../common';
import { DepartamentosController } from './departamentos/departamentos.controller';
import { ReservaEntity } from './reservas/entity/reservas.entity';
import { ReservasController } from './reservas/reservas.controller';
import { ReservasService } from './reservas/reservas.service';
import { DepartamentosService } from './departamentos/departamentos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservaEntity]),
    ClientsModule.register([
      { name: MAILER_MS, options: { port: 3001, host: 'localhost' } },
    ]),
  ],
  controllers: [ReservasController, DepartamentosController],
  providers: [ReservasService, DepartamentosService],
})
export class ReservasModule {}
