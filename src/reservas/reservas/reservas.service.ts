import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservaEntity } from './entity/reservas.entity';
import { Repository } from 'typeorm';
import { ReservaDto } from './dto/reservas.dto';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(ReservaEntity)
    private readonly repo: Repository<ReservaDto>,
  ) {}

  async findAll() {
    try {
      const result = await this.repo.find({ relations: { usuario: true } });
      result[0].usuario
    } catch (error) {
      console.error(error);
    }
  }
}
