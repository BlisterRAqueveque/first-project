import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  providers: [SocketGateway, SocketService],
  imports: [UsuariosModule]
})
export class SocketModule {}
