import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from 'src/config';
import { saveImagesToStorage } from 'src/helpers/image-storage';
import { AuthService } from './auth/auth.service';
import { UsuariosController } from './usuarios.controller';
import { UsuarioEntity } from './entity/usuarios.entity';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity]),
    JwtModule.register({
      secret: envs.jwt,
      signOptions: {
        expiresIn: '24h',
      },
    }),
    MulterModule.register({
      dest: './uploads',
      fileFilter: saveImagesToStorage('avatar').fileFilter,
      storage: saveImagesToStorage('avatar').storage,
    }),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, AuthService],
  exports: [AuthService, UsuariosService],
})
export class UsuariosModule {}
