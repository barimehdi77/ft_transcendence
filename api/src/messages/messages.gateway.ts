import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io';
import { JoinConversationDto, SendMessageDto } from './dto';

// @UseGuards(WsGuard)
@WebSocketGateway({
  cors: {
    origin: 'http://localhost',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
  },
  path: '/socket',
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('joinConversation')
  joinConversation(
    @MessageBody() joinConversationDto: JoinConversationDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const { conversationId } = joinConversationDto;
      client.join(conversationId);
      return {
        status: 'success',
        message: 'You have joined the conversation',
      };
    } catch (error) {
      let message = 'Somthing went wrong!';
      if (error.message.includes('error:')) {
        message =
          error.message &&
          error.message.replace('Error: ', '') &&
          error.message.replace('error: ', '');
      }
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody() sendMessageDto: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const intra_id: number = this.messagesService.decode(
        client.handshake.headers.authorization,
      );

      const message = await this.messagesService.sendMessage(
        sendMessageDto,
        intra_id,
      );
      this.server
        .to(sendMessageDto.conversationId)
        .emit('receiveMessage', message);
      return {
        status: 'success',
        message: 'Message sent',
      };
    } catch (error) {
      let message = 'Somthing went wrong!';
      if (error.message.includes('error:')) {
        message =
          error.message &&
          error.message.replace('Error: ', '') &&
          error.message.replace('error: ', '');
      }
      return {
        status: 'failure',
        msg: message,
      };
    }
  }

  handleDisconnect(client: Socket) {
    client.disconnect();
  }
}
