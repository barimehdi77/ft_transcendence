import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaClient) {}
  FRAMERATE = 30;
  state: any = {};
  clientRooms: any = {};
  clientSpectating: any = {};
  gameActive: any = {};
  canvasWidth = 600;
  canvasHeight: number = this.canvasWidth / 2;
  playerDisconnected: any = {};

  createGameState() {
    return {
      playerOne: {
        id: 'playerOne',
        name: '',
        x: 0,
        y: (this.canvasHeight - 100) / 2,
        width: 10,
        height: 100,
        color: 'white',
        score: 0,
      },
      playerTwo: {
        id: 'playerTwo',
        name: '',
        x: this.canvasWidth - 10,
        y: (this.canvasHeight - 100) / 2,
        width: 10,
        height: 100,
        color: 'white',
        score: 0,
      },
      ball: {
        x: this.canvasWidth / 2,
        y: this.canvasHeight / 2,
        radius: this.canvasHeight * 0.02,
        speed: 7,
        velocityX: 7,
        velocityY: 7,
        color: 'white',
      },
    };
  }

  hasCollision(ball: any, player: any) {
    return (
      ball.x + ball.radius > player.x &&
      ball.x - ball.radius < player.x + player.width &&
      ball.y + ball.radius > player.y &&
      ball.y - ball.radius < player.y + player.height
    );
  }

  collision(b: any, p: any) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return (
      b.right >= p.left &&
      b.bottom >= p.top &&
      b.left <= p.right &&
      b.top <= p.bottom
    );
  }

  resetBall(state: any) {
    state.ball.x = this.canvasWidth / 2;
    state.ball.y = this.canvasHeight / 2;
    state.ball.speed = 7;
    state.ball.velocityX = -state.ball.velocityX;
  }

  // count: number = 0;
  gameloop(state: any) {
    if (!state) return;
    const playerOne = state.playerOne;
    const playerTwo = state.playerTwo;
    const ball = state.ball;

    if (ball.x - ball.radius < 0) {
      playerTwo.score++;
      this.resetBall(state);
    } else if (ball.x + ball.radius > this.canvasWidth) {
      playerOne.score++;
      this.resetBall(state);
    }

    // the ball has a velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    // computer plays for itself, and we must be able to beat it

    // sample AI to control the com paddle
    // playerTwo.y += (ball.y - (playerTwo.y + playerTwo.height / 2)) * 1;

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > this.canvasHeight)
      // setball({...ball, velocityY: -ball.velocityY});
      ball.velocityY = -ball.velocityY;
    const player =
      ball.x + ball.radius < this.canvasWidth / 2 ? playerOne : playerTwo;
    if (this.collision(ball, player)) {
      // where the ball hit the player
      let collidPoint = ball.y - (player.y + player.height / 2);
      // normalisation
      collidPoint /= player.height / 2;
      // calculate angle in radian
      const angleRad = collidPoint * (Math.PI / 4);
      // X direction of the ball when it's hit
      const direction = ball.x + ball.radius < this.canvasWidth / 2 ? 1 : -1;

      // change vel X and Y
      ball.velocityX = direction * ball.speed * Math.cos(angleRad);
      ball.velocityY = ball.speed * Math.sin(angleRad);
      // everytime the ball hit a paddle, we encrese its speed
      ball.speed += 0.1;
      // update the score;
    }
    if (playerOne.score == 2) return 1;
    if (playerTwo.score == 2) return 2;
    return false;
  }

  handleKeyDown(keyCode: any) {
    try {
      const key = parseInt(keyCode);
      switch (key) {
        case 87: // up
          return -1;
        case 83: // down
          return 1;
        default:
          return 0;
      }
    } catch (e) {
      console.error(e);
    }
  }

  updatePlayer(client: Socket, state: any, ret: number) {
    const roomName = this.clientRooms[client.id];
    if (!roomName || !this.gameActive[roomName]) return;
    if (this.state[roomName].playerOne.id === client.id)
      this.updatePlayerOne(state[roomName], ret);
    else this.updatePlayerTwo(state[roomName], ret);
  }

  updatePlayerOne(state: any, ret: number) {
    if (ret == 1) {
      if (state.playerOne.y + 115 > this.canvasHeight)
        state.playerOne.y = this.canvasHeight - 100;
      else state.playerOne.y += 15;
    } else if (ret == -1) {
      if (state.playerOne.y < 15) state.playerOne.y = 0;
      else state.playerOne.y -= 15;
    }
  }

  updatePlayerTwo(state: any, ret: number) {
    if (ret == 1) {
      if (state.playerTwo.y + 115 > this.canvasHeight)
        state.playerTwo.y = this.canvasHeight - 100;
      else state.playerTwo.y += 15;
    } else if (ret == -1) {
      if (state.playerTwo.y < 15) state.playerTwo.y = 0;
      else state.playerTwo.y -= 15;
    }
  }

  starting = (server: Server, state: any, roomName: string) => {
    let count = 3;
    const int = setInterval(() => {
      server.in(roomName).emit('start');
      count--;
      if (count === 0) {
        clearInterval(int);
        this.startGameInterval(server, state, roomName);
      }
    }, 1500);
  };

  startGameInterval = (server: Server, state: any, roomName: string) => {
    // playerOne win return 1 && playerTwo win return 2
    const interval = setInterval(async () => {
      const winner = this.gameloop(state[roomName]);
      const stateRoom = state[roomName];
      if (this.gameActive[roomName]) {
        if (!winner) {
          // clinet.emit('gameState', JSON.stringify(state));
          this.emitGameState(server, stateRoom, roomName);
        } else {
          // console.log("GameOver: ", stateRoom);
          clearInterval(interval);
          this.gameActive[roomName] = false;
          this.emitGameOver(server, roomName, winner);
          await this.prisma.match.create({
            data: {
              player_one: stateRoom.playerOne.name,
              player_two: stateRoom.playerTwo.name,
              player_one_score: stateRoom.playerOne.score,
              player_two_score: stateRoom.playerTwo.score,
            },
          });
        }
      } else {
        // ${this.state[roomName]}
        // console.log(`player[] ${this.playerDisconnected[roomName]} was disconnected`);
        this.emitPlayerDesconnected(
          server,
          roomName,
          this.playerDisconnected[roomName],
        );
        clearInterval(interval);
        // console.log("disconnect: ", state[roomName]);
        if (this.playerDisconnected[roomName] === 1)
          await this.prisma.match.create({
            data: {
              player_one: stateRoom.playerOne.name,
              player_two: stateRoom.playerTwo.name,
              player_one_score: 0,
              player_two_score: 10,
            },
          });
        else if (this.playerDisconnected[roomName] === 2)
          await this.prisma.match.create({
            data: {
              player_one: stateRoom.playerOne.name,
              player_two: stateRoom.playerTwo.name,
              player_one_score: 10,
              player_two_score: 0,
            },
          });
      }
    }, 1000 / this.FRAMERATE);
  };

  handleNewGame(client: Socket, userInfo: any) {
    const roomName = Math.floor(Math.random() * 1000000);
    this.clientRooms[client.id] = roomName;
    this.roomName = roomName;
    client.emit('gameCode', roomName);

    this.state[roomName] = this.createGameState();
    this.state[roomName].playerOne.id = client.id;
    this.state[roomName].playerOne.name = userInfo.user_name;
    client.join(roomName.toString());
    client.emit('init', 1);
  }

  //client.on('joinGame', handleJoinGame);
  handleJoinGame(
    server: Server,
    client: Socket,
    gameCode: string,
    userInfo: any,
  ) {
    let room: string;
    if (!gameCode) return;
    this.gameActive[gameCode] = true;
    server.sockets.adapter.rooms
      .get(gameCode)
      .forEach((value) => (room = value));
    let allUsers;
    if (room) {
      allUsers = server.sockets;
    }

    let numClients = 0;
    if (allUsers) {
      // numClients = Object.keys(allUsers).length;
      numClients = server.engine.clientsCount;
      // console.log("length: ", numClients, " length2: ", server.engine.length);
    }

    if (numClients === 0) {
      client.emit('unknownGame');
      return;
    }
    // else if (numClients > 1) {
    //     client.emit('tooManyPlayers');
    //     return;
    // }

    this.clientRooms[client.id] = gameCode;

    client.join(gameCode);
    this.state[gameCode].playerTwo.id = client.id;
    this.state[gameCode].playerTwo.name = userInfo.user_name;
    client.emit('init', 2);
    this.starting(server, this.state, gameCode);
  }

  roomName: number;
  cp = 1;
  wait = false;
  handlePlayGame(server: Server, client: Socket, userInfo: any) {
    if (this.cp % 2 != 0) {
      this.handleNewGame(client, userInfo);
      // console.log("First => cp: ", this.cp, " toomName: ", this.roomName);
      this.cp++;
      this.wait = true;
      const interval = setInterval(() => {
        server.in(this.roomName.toString()).emit('waiting');
        if (!this.wait) clearInterval(interval);
      }, 500);
    } else {
      // console.log("second => cp: ", this.cp, " roomName: ", this.roomName);
      this.handleJoinGame(server, client, this.roomName.toString(), userInfo);
      // console.log("gameActive", this.gameActive);
      this.cp++;
      this.wait = false;
    }
  }

  handleSpectateGame(server: Server, client: Socket, gameCode: string) {
    let room: string;
    if (!gameCode) return;
    server.sockets.adapter.rooms
      .get(gameCode)
      .forEach((value) => (room = value));
    this.clientSpectating[client.id] = gameCode;
    setInterval(() => {
      const state = this.state[gameCode];
      server.emit('spectateState', JSON.stringify(state));
    }, 1000 / this.FRAMERATE);
  }

  emitGameState(server: Server, gameState: any, roomName: string) {
    server.sockets.in(roomName).emit('gameState', JSON.stringify(gameState));
  }

  emitGameOver(server: Server, roomName: string, winner: any) {
    // console.log("Over gameActive", this.gameActive);
    server.in(roomName).emit('gameOver', JSON.stringify(winner));
  }

  emitPlayerDesconnected(server: Server, roomName: string, winner: number) {
    server.in(roomName).emit('playerDisconnected', JSON.stringify(winner));
  }
}
