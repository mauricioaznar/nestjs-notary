import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AuthGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  socket: Socket;

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  handleConnection(socket: Socket, ...args: any[]): any {
    this.socket = socket;
  }

  joinAuth() {
    this.socket.join('auth');
  }

  disconnect() {
    this.socket.disconnect();
  }

  emit(event: string, data: any) {
    this.server.to('auth').emit(event, data);
  }
}
