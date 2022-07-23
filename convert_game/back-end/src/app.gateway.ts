import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';

@WebSocketGateway()
export class AppGateway implements NestGateway {
  afterInit: (server: any) => {

  };
  handleConnection: (client: any) => {

  };
  handleDisconnect: (client: any) => {

  };

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}