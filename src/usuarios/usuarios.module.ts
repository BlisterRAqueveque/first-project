import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './usuarios.entity';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  controllers: [UsuariosController],
  providers: [UsuariosService, AuthService],
})
export class UsuariosModule {}
