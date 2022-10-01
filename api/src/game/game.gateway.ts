import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { GameService } from './game.service';
import { Server, Socket } from 'socket.io';

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
  constructor(private readonly gameService: GameService) { }

  handleDisconnect(client: Socket) {
    const roomName = this.gameService.clientRooms[client.id];
    if (this.gameService.state[roomName]) {
      this.gameService.waitlist = false;
      this.gameService.gameActive[roomName] = false;
      if (client.id === this.gameService.state[roomName].playerOne.id) {
        this.gameService.playerDisconnected[roomName] = 1;
      }
      else if (client.id === this.gameService.state[roomName].playerTwo.id) {
        this.gameService.playerDisconnected[roomName] = 2;
      }
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

  @SubscribeMessage('spectateGame')
  handleSpectateGame(
    @MessageBody() gameCode: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.gameService.start[client.id] = true;
    return this.gameService.handleSpectateGame(this.server, client, gameCode);
  }

  @SubscribeMessage('playGame')
  handlePlayGame(@MessageBody() userInfo: any, @ConnectedSocket() client: Socket) {
    return this.gameService.handlePlayGame(this.server, client, userInfo);
  }

  @SubscribeMessage('listOfPlayersPlaying')
  handleListOfPlayersPlaying() {
    return (this.gameService.ListOfPlayersPlaying());
  }
  @SubscribeMessage('stop')
  stop(@ConnectedSocket() client: Socket) {
    this.gameService.start[client.id] = false;
  }

  @SubscribeMessage('connected')
  handleUsers(@MessageBody() userInfo: any, @ConnectedSocket() client: Socket) {
    this.gameService.users[userInfo.user_name] = client.id;
  }
  
  @SubscribeMessage('question')
  question(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.gameService.handlQuestion(this.server, data)
  }


  @SubscribeMessage('friendAccepted')
  handlAccepted(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.gameService.handlAccepted(this.server, client, data)
  }

}
