import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { AuthService } from 'src/usuarios/auth/auth.service';
import { Payload } from 'src/common';

@WebSocketGateway()
export class SocketGateway implements OnModuleInit {
  constructor(
    private readonly socketService: SocketService,
    private readonly auth: AuthService,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', async (socket: Socket) => {
      try {
        //! Verificamos el token, para obtener la información
        const payload: Payload = await this.auth.verifyJwt(
          socket.handshake.headers.authorization,
        );

        console.log(`Usuario conectado con id: ${socket.id}`);

        const socketUsuario = this.socketService.getSocket(
          +socket.handshake.headers['usuario'],
        );

        if (socketUsuario) {
          socketUsuario.socket.emit(
            `El usuario: ${payload.nombre} estableció una conexión`,
          );
        }

        //! Emitimos un mensaje de bienvenida
        this.server.emit(
          'welcome-message',
          `Bienvenidos a nuestro servidor, usuario ${socket.id}`,
        );
        //! Mandamos la información del usuario al servicio
        this.socketService.onConnection(socket, payload);

        socket.on('disconnect', () => {
          console.log(`Usuario desconectado con id: ${socket.id}`);
          //! Si se desconecta, se elimina el usuario del servicio
          this.socketService.onDisconnection(socket);
        });
      } catch (error) {
        //! En caso de error se debe desconectar:
        socket.disconnect();
        //! Mensaje de excepción
        throw new UnauthorizedException('Información incorrecta');
      }
    });
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
