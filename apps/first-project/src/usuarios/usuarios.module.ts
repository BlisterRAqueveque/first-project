import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from '../config';
import { AuthService } from './auth/auth.service';
import { UsuarioEntity } from './entity/usuarios.entity';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity]),
    JwtModule.register({
      secret: envs.jwt,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [UsuariosController],
  providers: [AuthService, UsuariosService, JwtStrategy],
  exports: [AuthService, UsuariosService],
})
export class UsuariosModule {}
