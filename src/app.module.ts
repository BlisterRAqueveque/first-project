import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db } from './config';
import { SocketModule } from './socket/socket.module';
import { JwtMiddleware } from './usuarios/auth/middlewares/jwt/jwt.middleware';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ReservasModule } from './reservas/reservas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(db),
    UsuariosModule,
    SocketModule,
    ReservasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        {
          path: '/usuarios/auth/login',
          method: RequestMethod.POST,
        },
        {
          path: '/usuarios/auth/register',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('');
  }
}
