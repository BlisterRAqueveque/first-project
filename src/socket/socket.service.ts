import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Payload } from 'src/common';

@Injectable()
export class SocketService {
  /**
   * @description
   * Almacenamos los usuarios conectados
   */
  private clients: { [key: string]: { socket: Socket; payload: Payload } } = {};

  /**
   * @description
   * Almacenamos el socket del usuario, identificado por el id único generado
   */
  onConnection(socket: Socket, payload: Payload) {
    this.clients[socket.id] = { socket: socket, payload: payload };
  }

  /**
   * @description
   * Una vez desconectado, se elimina de la lista
   */
  onDisconnection(socket: Socket) {
    delete this.clients[socket.id];
  }

  /**
   * @description
   * Obtenemos un socket a traves de un id de un usuario
   */
  getSocket(id: number) {
    //* Recorremos la lista objeto valor
    for (let key in this.clients) {
      //* Retornamos el valor
      if (this.clients[key].payload.sub == id) return this.clients[key];
      //* O si no existe, nulo
      else return null;
    }
  }
}
