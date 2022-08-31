import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { GameTwoService } from './game-two.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameTwoGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly gameTwoService: GameTwoService) { }

  afterInit() {
    console.log('Websocket Server Started,Listening on Port:3000');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`, " length: ", this.server.engine.clientsCount, "  server:   ", Object.keys(this.server.sockets).length);
    // this.gameTwoService.state = this.gameTwoService.createGameState();
    // client.on('keyDown', keyCode => {
    //   const ret = this.gameTwoService.handleKeyDown(keyCode);
    //   this.gameTwoService.updatePlayer(client, state, ret);
    // });
    // client.on('newGame', this.gameTwoService.handleNewGame);
    // this.gameTwoService.startGameInterval(client, state);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const roomName = this.gameTwoService.clientRooms[client.id];
    if (roomName) {
      this.gameTwoService.gameActive = false;
      if (client.id === this.gameTwoService.state[roomName].playerOne.id)
        this.gameTwoService.playerDisconnected = 1;
      else if (client.id === this.gameTwoService.state[roomName].playerTwo.id)
        this.gameTwoService.playerDisconnected = 2;
    }
  }

  @SubscribeMessage('keyDown')
  handleKeyDown(
    @MessageBody() keyCode: number,
    @ConnectedSocket() client: Socket
  ) {
    const ret = this.gameTwoService.handleKeyDown(keyCode);
    this.gameTwoService.updatePlayer(client, this.gameTwoService.state, ret);
  }

  @SubscribeMessage('newGame')
  handleNewGame(@ConnectedSocket() client: Socket, @MessageBody() name: string) {
    this.gameTwoService.handleNewGame(client, name);
  }

  @SubscribeMessage('joinGame')
  handleJoinGame(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.gameTwoService.handleJoinGame(this.server, client, data.gameCode, data.name);
  }

  @SubscribeMessage('spectateGame')
  handleSpectateGame(@MessageBody() gameCode: string, @ConnectedSocket() client: Socket) {
    this.gameTwoService.handleSpectateGame(this.server, client, gameCode);
  }

  // @SubscribeMessage('canvaSize')
  // handleCanvaSize(@MessageBody() data: any) {
  //   this.gameTwoService.handleCanvaSize(data.width, data.height)
  // }
}
