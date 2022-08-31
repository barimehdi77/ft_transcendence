import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { FRAMERATE } from './constants';

@Injectable()
export class GameTwoService {
    constructor() { }
    state: any = {};
    clientRooms: any = {};
    clientSpectating: any = {};
    gameActive: boolean = false;
    canvasWidth: number = 600;
    canvasHeight: number = this.canvasWidth / 2;
    playerDisconnected: number = 0;

    // handleCanvaSize(width: number, height: number) {
    //     this.canvasWidth = width;
    //     this.canvasHeight = height;
    // }

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
                color: "white"
            }
        }
    }

    hasCollision(ball: any, player: any) {
        return ball.x + ball.radius > player.x &&
            ball.x - ball.radius < player.x + player.width &&
            ball.y + ball.radius > player.y &&
            ball.y - ball.radius < player.y + player.height;
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

        return (b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom);
    }

    resetBall(state: any) {
        state.ball.x = this.canvasWidth / 2;
        state.ball.y = this.canvasHeight / 2;
        state.ball.speed = 7;
        state.ball.velocityX = -state.ball.velocityX;
    }

    // count: number = 0;
    gameloop(state: any) {
        if (!state)
            return;
        const playerOne = state.playerOne;
        const playerTwo = state.playerTwo;
        const ball = state.ball;

        if (ball.x - ball.radius < 0) {
            playerTwo.score++;
            this.resetBall(state);
        }
        else if (ball.x + ball.radius > this.canvasWidth) {
            playerOne.score++;
            this.resetBall(state);
        }

        // the ball has a velocity
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;
        // computer plays for itself, and we must be able to beat it

        // sample AI to control the com paddle
        // playerTwo.y += (ball.y - (playerTwo.y + playerTwo.height / 2)) * 1;


        // if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0)
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > this.canvasHeight)
            // setball({...ball, velocityY: -ball.velocityY});
            ball.velocityY = -ball.velocityY;
        let player = (ball.x + ball.radius < this.canvasWidth / 2) ? playerOne : playerTwo;
        if (this.collision(ball, player)) {
            // where the ball hit the player
            let collidPoint = ball.y - (player.y + player.height / 2);
            // normalisation
            collidPoint /= player.height / 2;
            // calculate angle in radian
            let angleRad = collidPoint * (Math.PI / 4);
            // X direction of the ball when it's hit
            let direction = (ball.x + ball.radius < this.canvasWidth / 2) ? 1 : -1;

            // change vel X and Y
            ball.velocityX = direction * ball.speed * Math.cos(angleRad);
            ball.velocityY = ball.speed * Math.sin(angleRad);
            // everytime the ball hit a paddle, we encrese its speed
            ball.speed += 0.1;
            // update the score;
        }

        // playerOne win
        if (playerOne.score == 10) {
            // this.gameActive = false;
            playerOne.score = 0;
            playerTwo.score = 0;
            ball.x = this.canvasWidth / 2;
            ball.y = this.canvasHeight / 2;
            ball.velocityX = 7;
            ball.velocityY = 7;
            return 1;
        }
        // playerTwo win
        if (playerTwo.score == 10) {
            // this.gameActive = false;
            playerOne.score = 0;
            playerTwo.score = 0;
            ball.x = this.canvasWidth / 2;
            ball.y = this.canvasHeight / 2;
            ball.velocityX = -7;
            ball.velocityY = 7;
            return 2;
        }
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
        if (!roomName || !this.gameActive)
            return;
        if (this.state[roomName].playerOne.id === client.id)
            this.updatePlayerOne(state[roomName], ret);
        else
            this.updatePlayerTwo(state[roomName], ret);
    }

    updatePlayerOne(state: any, ret: number) {
        if (ret == 1) {
            if (state.playerOne.y + 115 > this.canvasHeight)
                state.playerOne.y = this.canvasHeight - 100;
            else state.playerOne.y += 15;
        }
        else if (ret == -1) {
            if (state.playerOne.y < 15)
                state.playerOne.y = 0;
            else state.playerOne.y -= 15;
        }
    }

    updatePlayerTwo(state: any, ret: number) {
        if (ret == 1) {
            if (state.playerTwo.y + 115 > this.canvasHeight)
                state.playerTwo.y = this.canvasHeight - 100;
            else state.playerTwo.y += 15;
        }
        else if (ret == -1) {
            if (state.playerTwo.y < 15)
                state.playerTwo.y = 0;
            else state.playerTwo.y -= 15;
        }
    }

    startGameInterval(server: Server, state: any, roomName: string) {
        // playerOne win return 1 && playerTwo win return 2
        const interval = setInterval(() => {
            const winner = this.gameloop(state[roomName]);
            if (this.gameActive) {
                if (!winner) {
                    // clinet.emit('gameState', JSON.stringify(state));
                    this.emitGameState(server, state[roomName], roomName);
                }
                else {
                    this.emitGameOver(server, roomName, winner);
                    this.state[roomName] = null;
                    clearInterval(interval);
                    this.gameActive = false;
                }
            }
            else {
                console.log(`player ${this.playerDisconnected} was disconnected`);
                this.emitPlayerDesconnected(server, roomName, this.playerDisconnected);
                clearInterval(interval);
            }
        }, 1000 / FRAMERATE);
    }

    handleNewGame(client: Socket, name: string) {
        let roomName = Math.floor(Math.random() * 1000000);
        this.clientRooms[client.id] = roomName;
        client.emit('gameCode', roomName);

        this.state[roomName] = this.createGameState();
        this.state[roomName].playerOne.id = client.id;
        this.state[roomName].playerOne.name = name;

        client.join(roomName.toString());
        client.emit('init', 1);
    }

    //client.on('joinGame', handleJoinGame);
    handleJoinGame(server: Server, client: Socket, gameCode: string, name: string) {
        let room: string;
        if (!gameCode)
            return;
        this.gameActive = true;
        server.sockets.adapter.rooms.get(gameCode).forEach((value) => room = value)
        let allUsers;
        if (room) {
            allUsers = server.sockets;
        }

        let numClients = 0;
        if (allUsers) {
            // numClients = Object.keys(allUsers).length;
            numClients = server.engine.clientsCount;
            console.log("length: ", numClients);
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
        this.state[gameCode].playerTwo.name = name;
        client.emit('init', 2);
        this.startGameInterval(server, this.state, gameCode);
    }

    handleSpectateGame(server: Server, client: Socket, gameCode: string) {
        let room: string;
        if (!gameCode)
            return;
        server.sockets.adapter.rooms.get(gameCode).forEach((value) => room = value)
        this.clientSpectating[client.id] = gameCode;
        setInterval(() => {
            const state = this.state[gameCode];
            server.emit("spectateState", JSON.stringify(state));
        }, 1000 / FRAMERATE);

    }

    emitGameState(server: Server, gameState: any, roomName: string) {
        server.sockets.in(roomName).emit("gameState", JSON.stringify(gameState))
    }

    emitGameOver(server: Server, roomName: string, winner: any) {
        server.in(roomName).emit('gameOver', JSON.stringify(winner));
    }

    emitPlayerDesconnected(server: Server, roomName: string, winner: number) {
        server.in(roomName).emit('playerDisconnected', JSON.stringify(winner));
    }
}
