import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { GameService } from './game.service';
import { Server, Socket } from 'socket.io';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
@WebSocketGateway({
  cors: {
    origin: 'http://localhost',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
  },
  path: '/socket',
})
export class GameGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly gameService: GameService) {}

  afterInit() {
    console.log('Websocket Server Started,Listening on Port:8080');
  }

  handleConnection(client: Socket) {
    console.log(
      `Client game connected: ${client.id}`,
      ' length: ',
      this.server.engine.clientsCount,
    );
  }

  handleDisconnect(client: Socket) {
    // console.log(`Client disconnected: ${client.id}`);
    const roomName = this.gameService.clientRooms[client.id];
    if (this.gameService.state[roomName]) {
      this.gameService.gameActive[this.gameService.roomName] = false;
      if (client.id === this.gameService.state[roomName].playerOne.id)
        this.gameService.playerDisconnected[roomName] = 1;
      else if (client.id === this.gameService.state[roomName].playerTwo.id)
        this.gameService.playerDisconnected[roomName] = 2;
    }
  }

  @SubscribeMessage('keyDown')
  handleKeyDown(
    @MessageBody() keyCode: number,
    @ConnectedSocket() client: Socket,
  ) {
    const ret = this.gameService.handleKeyDown(keyCode);
    this.gameService.updatePlayer(client, this.gameService.state, ret);
  }

  @SubscribeMessage('newGame')
  handleNewGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() name: string,
  ) {
    this.gameService.handleNewGame(client, name);
  }

  @SubscribeMessage('joinGame')
  handleJoinGame(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.gameService.handleJoinGame(
      this.server,
      client,
      data.gameCode,
      data.name,
    );
  }

  @SubscribeMessage('spectateGame')
  handleSpectateGame(
    @MessageBody() gameCode: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.gameService.handleSpectateGame(this.server, client, gameCode);
  }

  @SubscribeMessage('playGame')
  handlePlayGame(@MessageBody() userInfo: any, @ConnectedSocket() client: Socket) {
    // console.log("userInfo: ", userInfo);
    this.gameService.handlePlayGame(this.server, client, userInfo);
  }
}
