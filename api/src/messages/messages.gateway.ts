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
/* @WebSocketGateway({
  cors: {
    origin: '*',
  },
  path: '/socket',
}) */
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly messagesService: MessagesService) {}

  // afterInit() {
  //   console.log('Chat websocket Server Started');
  // }

  // handleConnection(client: Socket) {
  //   console.log(
  //     `Chat client connected: ${client.id}`,
  //     ' length: ',
  //     this.server.engine.clientsCount,
  //   );
  // }

  // handleDisconnect(client: Socket) {
  //   console.log(`Chat client disconnected: ${client.id}`);
  // }

  @SubscribeMessage('joinConversation')
  joinConversation(
    @MessageBody() joinConversationDto: JoinConversationDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { conversationId } = joinConversationDto;
    client.join(conversationId);
    console.log('joined conversation', client.id);

    return {
      status: 'success',
      message: 'You have joined the conversation',
    };
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody() sendMessageDto: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      // this is temp
      const intra_id: number = this.messagesService.decode(
        client.handshake.headers.authorization,
      );
      //////

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
      const message =
        error.message &&
        error.message.replace('Error: ', '') &&
        error.message.replace('error: ', '');
      return {
        status: 'failure',
        msg: message,
      };
    }
  }
}
