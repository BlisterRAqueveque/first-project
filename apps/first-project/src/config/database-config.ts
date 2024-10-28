import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envs } from './envs';

export const db: TypeOrmModuleOptions = {
  type: 'mysql',
  host: envs.host,
  username: envs.user,
  password: envs.pass,
  database: envs.database,
  entities: [],
  autoLoadEntities: true, //! Carga las entidades
  synchronize: true, //! Realiza las migraciones de las tablas automáticamente
};

