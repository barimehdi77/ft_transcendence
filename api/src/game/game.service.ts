import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { GameStatus, Prisma, PrismaClient, ProfileStatus } from '@prisma/client';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaClient,
    private profileService: ProfileService) { }

  users: any = {}

  FRAMERATE = 69;
  state: any = {};
  clientRooms: any = {};
  clientSpectating: any = {};
  gameActive: any = {};
  canvasWidth = 600;
  canvasHeight: number = this.canvasWidth / 2;
  playerDisconnected: any = {};
  waitlist: boolean = false;
  waitlistF: boolean = false;
  roomName: number;
  idPrisma: any = {};

  playersPlaying: any = {}

  createGameState() {
    return {
      color: Math.floor(Math.random() * 4),
      playerOne: {
        id: 'playerOne',
        name: '',
        displayName: '',
        x: 0,
        y: (this.canvasHeight - 100) / 2,
        width: 10,
        height: 100,
        score: 0,
      },
      playerTwo: {
        id: 'playerTwo',
        name: '',
        displayName: '',
        x: this.canvasWidth - 10,
        y: (this.canvasHeight - 100) / 2,
        width: 10,
        height: 100,
        score: 0,
      },
      ball: {
        x: this.canvasWidth / 2,
        y: this.canvasHeight / 2,
        radius: this.canvasHeight * 0.02,
        speed: 7,
        velocityX: 7,
        velocityY: 7
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
    if (playerOne.score == 5) return 1;
    if (playerTwo.score == 5) return 2;
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
    const interval = setInterval(() => {
      server.in(roomName).emit('start');
      count--;
      if (count === 0) {
        clearInterval(interval);
        server.emit('listOfPlayersPlaying', JSON.stringify(this.playersPlaying))
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
          this.emitGameState(server, stateRoom, roomName);
        } else {
          clearInterval(interval);
          this.gameActive[roomName] = false;
          this.emitGameOver(server, roomName, winner, stateRoom);
          return;
        }
      } else {
        this.emitPlayerDesconnected(server, roomName, this.playerDisconnected[roomName], stateRoom);
        if (this.playerDisconnected[roomName] === 1)
          this.prismaUpdate(roomName, 0, 5, true);
        else if (this.playerDisconnected[roomName] === 2)
          this.prismaUpdate(roomName, 5, 0, true);
        clearInterval(interval);
        return;
      }
    }, 1000 / this.FRAMERATE);
  };

  handleNewGame(client: Socket, userInfo: any) {
    const roomName = Math.floor(Math.random() * 1000000);
    this.clientRooms[client.id] = roomName;
    client.emit('gameCode', roomName);
    this.state[roomName] = this.createGameState();
    this.state[roomName].playerOne.id = client.id;
    this.state[roomName].playerOne.name = userInfo.login;
    this.state[roomName].playerOne.displayName = userInfo.user_name;
    client.join(roomName.toString());
    client.emit('init', 1);
    return roomName;
  }

  handleJoinGame = async (server: Server, client: Socket, gameCode: string, userInfo: any) => {
    if (!gameCode) return;
    this.gameActive[gameCode] = true;
    this.clientRooms[client.id] = gameCode;
    client.join(gameCode);
    this.state[gameCode].playerTwo.id = client.id;
    this.state[gameCode].playerTwo.name = userInfo.login;
    this.state[gameCode].playerTwo.displayName = userInfo.user_name;
    this.playersPlaying[gameCode] = { p1: this.state[gameCode].playerOne.name, p2: this.state[gameCode].playerTwo.name };
    client.emit('init', 2);
    const stateRoom = this.state[gameCode];
    this.idPrisma[gameCode] = await this.prisma.match.create({
      data: {
        player_one: stateRoom.playerOne.name,
        player_two: stateRoom.playerTwo.name,
        player_one_score: stateRoom.playerOne.score,
        player_two_score: stateRoom.playerTwo.score,
        status: GameStatus.PLAYING,
      },
    });
    await this.prisma.user.update({
      where: {
        login: stateRoom.playerOne.name
      },
      data: {
        profile: {
          update: {
            status: ProfileStatus.INGAME,
          }
        }
      }
    });
    await this.prisma.user.update({
      where: {
        login: stateRoom.playerTwo.name
      },
      data: {
        profile: {
          update: {
            status: ProfileStatus.INGAME,
          }
        }
      }
    });
    this.starting(server, this.state, gameCode);
  }

  wait = false;
  waitF = false;
  name: string;
  friendList = {};
  roomNameFriend: number;
  handlePlayGame(server: Server, client: Socket, userInfo: any) {
    if (userInfo.type === "random") {
        if (!this.waitlist) {
          this.name = userInfo.userInfo.login;
          this.waitlist = true;
          this.roomName = this.handleNewGame(client, userInfo.userInfo)
          this.wait = true;
          const interval = setInterval(() => {
            server.in(this.roomName.toString()).emit('waiting');
            if (!this.wait) clearInterval(interval);
          }, 500);
        } else if (this.name !== userInfo.userInfo.login) {
          this.waitlist = false;
          this.handleJoinGame(server, client, this.roomName.toString(), userInfo.userInfo);
          this.wait = false;
        }
        return this.state[this.roomName].color;
    }
    else if (userInfo.type === "friend") {
        if (!this.waitlistF) {
          this.name = userInfo.userInfo.login;
          this.waitlistF = true;
          this.roomNameFriend = this.handleNewGame(client, userInfo.userInfo)
          this.waitF = true;
          const interval = setInterval(() => {
            server.in(this.roomNameFriend.toString()).emit('waiting');
            if (!this.waitF) clearInterval(interval);
          }, 500);
        } else if (this.name !== userInfo.userInfo.login) {
          this.waitlistF = false;
          this.handleJoinGame(server, client, this.roomNameFriend.toString(), userInfo.userInfo);
          this.waitF = false;
        }
        return this.state[this.roomNameFriend].color;
      }
  }

  start = {};
  handleSpectateGame(server: Server, client: Socket, gameCode: string) {
    if (this.start[client.id] === true) {
      if (!gameCode) return;
      const interval = setInterval(() => {
        const state = this.state[gameCode];
        server.to(client.id).emit('spectateState', JSON.stringify(state));
        if (!this.gameActive[gameCode] || !this.start[client.id])
          clearInterval(interval);
      }, 1000 / this.FRAMERATE);
      return true;
    }
  }

  emitGameState(server: Server, gameState: any, roomName: string) {
    server.sockets.in(roomName).emit('gameState', JSON.stringify(gameState));
  }

  async updatePlayerPoints(matchGame: any) {
    if (matchGame.player_one_score > matchGame.player_two_score) {
      await this.prisma.user.update({
        where: {
          login: matchGame.player_one,
        },
        data: {
          profile: {
            update: {
              played_games: { increment: 1 },
              wins: { increment: 1 },
              user_points: { increment: 3 },
              status: ProfileStatus.ONLINE,
            }
          }
        }
      });
      await this.prisma.user.update({
        where: {
          login: matchGame.player_two,
        },
        data: {
          profile: {
            update: {
              played_games: { increment: 1 },
              losses: { increment: 1 },
              user_points: { decrement: 2 },
              status: ProfileStatus.ONLINE,
            }
          }
        }
      });
    }
    else {
      await this.prisma.user.update({
        where: {
          login: matchGame.player_two,
        },
        data: {
          profile: {
            update: {
              played_games: { increment: 1 },
              wins: { increment: 1 },
              user_points: { increment: 3 },
              status: ProfileStatus.ONLINE,
            }
          }
        }
      });
      await this.prisma.user.update({
        where: {
          login: matchGame.player_one,
        },
        data: {
          profile: {
            update: {
              played_games: { increment: 1 },
              losses: { increment: 1 },
              user_points: { decrement: 2 },
              status: ProfileStatus.ONLINE,
            }
          }
        }
      });
    }
  }

  async prismaUpdate(roomName: string, p1: number, p2: number, disconnect: boolean) {
    const stateRoom = this.state[roomName];
    if (!disconnect) {
      const matchData = await this.prisma.match.update({
        where: {
          id: this.idPrisma[roomName].id
        },
        data: {
          player_one_score: stateRoom.playerOne.score,
          player_two_score: stateRoom.playerTwo.score,
          status: GameStatus.ENDED
        }
      });
      this.updatePlayerPoints(matchData);
    }
    else {
      const matchDate = await this.prisma.match.update({
        where: {
          id: this.idPrisma[roomName].id
        },
        data: {
          player_one_score: p1,
          player_two_score: p2,
          status: GameStatus.ENDED
        }
      });
      this.updatePlayerPoints(matchDate);
    }
  }

  async emitGameOver(server: Server, roomName: string, winner: any, stateRoom: any) {
    delete this.playersPlaying[roomName];
    delete this.clientRooms[roomName];
    this.updateplayers(server, roomName);
    const matchGame = await this.prismaUpdate(roomName, 0, 0, false);
    let obj = {
      winner,
      stateRoom: stateRoom.color
    }
    server.in(roomName).emit('gameOver', JSON.stringify(obj));
  }

  emitPlayerDesconnected(server: Server, roomName: string, winner: number, stateRoom: any) {
    delete this.playersPlaying[roomName];
    delete this.clientRooms[roomName];
    this.updateplayers(server, roomName);
    let obj = {
      winner,
      stateRoom: stateRoom.color
    }
    server.in(roomName).emit('playerDisconnected', JSON.stringify(obj));
  }

  updateplayers(server: Server, roomName: string) {
    if (!this.gameActive[roomName])
      server.in(roomName).emit('updateplayers', JSON.stringify(this.playersPlaying));
  }

  ListOfPlayersPlaying() {
    return this.playersPlaying;
  }


  async getPlayingGames() {
    const playedGames = await this.prisma.match.findMany({
      where: {
        status: GameStatus.PLAYING,
      },
      select: {
        player_one: true,
        player_two: true,
      }
    });
    const returnPlayedGames = playedGames.map(async (game) => {
      return ({
        player_one: await this.profileService.getProfile(game.player_one),
        player_two: await this.profileService.getProfile(game.player_two)
      });
    });
    return (Promise.all(returnPlayedGames));
  }

  handlQuestion = (server: Server, data: any) => {
    if (this.users[data.to.name]) {
      server.to(this.users[data.to.name]).emit('invitation', {data: data.sender});
    }
  }

  handlAccepted = async (server: Server, client: Socket, data: any) => {
    if (this.users[data.data.sender]) {
      server.to(this.users[data.data.sender]).emit('urFriendAccepted', data.data.user);
    }
  }
}
