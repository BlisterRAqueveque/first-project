import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservaEntity } from './entity/reservas.entity';
import { Repository } from 'typeorm';
import { ReservaDto } from './dto/reservas.dto';
import { ClientProxy } from '@nestjs/microservices';
import { MAILER_MS } from '../../common';
import { firstValueFrom } from 'rxjs';
import { DepartamentosService } from '../departamentos/departamentos.service';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(ReservaEntity)
    private readonly repo: Repository<ReservaDto>,
    @Inject(MAILER_MS) private client: ClientProxy,
    private readonly departamentoService: DepartamentosService,
  ) {}

  async findAll() {
    try {
      const result = await this.repo.find({ relations: { usuario: true } });
      const update = this.departamentoService.updateDepartamento();
      result[0].usuario;
    } catch (error) {
      console.error(error);
    }
  }

  async createReserva() {
    try {
      //! CREO RESERVA
      //! ENVIAR UN MAIL
      this.client.emit('send-mail', 'test'); // => Envia evento, no esperar respuesta

      // const a = await firstValueFrom(this.client.send('send-mail', 'test')); // => Envia un evento, devuelve respuesta
      // console.log(a);
    } catch (error) {
      console.error(error);
    }
  }
}
