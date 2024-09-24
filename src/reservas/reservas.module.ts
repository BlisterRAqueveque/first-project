import { Module } from '@nestjs/common';
import { Reservas\departamentosController } from './departamentos/departamentos.controller';
import { Reservas\departamentosService } from './departamentos/departamentos.service';
import { ReservasController } from './reservas/reservas.controller';
import { ReservasService } from './reservas/reservas.service';

@Module({
  controllers: [Reservas\departamentosController, ReservasController],
  providers: [Reservas\departamentosService, ReservasService]
})
export class ReservasModule {}
