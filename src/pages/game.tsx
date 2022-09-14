import { useEffect, useState, useRef } from 'react';
// import { io } from 'socket.io-client'
import { paintGame, drawRect, drawText } from './drawing'
import { socket } from '../socket';

// const socket = io('http://localhost:8080');

//import SocketContext from "../../components/socket_context/context";


const Game = () => {
  const canvasRef = useRef(null);
  let canvas: HTMLCanvasElement;
  let ctx: any;

  const [gameCodeInput, setGameCodeInput] = useState('');
  // const [namePlayer, setNamePlayer] = useState('');
  const [gameCodeDisplay, setGameCodeDisplay] = useState('');
  // const [initialScreen, setinitialScreen] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [playerNamber, setPlayerNamber] = useState(0);

  const init = (player: number) => {
    setGameActive(true);
    setPlayerNamber(player)
  }

  if (typeof window !== "undefined") {
    window.onresize = () => {
      if (gameActive) {
        if (canvasRef.current) {
          if (window.innerWidth > 1300) {
            canvas.width = 600;
            canvas.height = canvas.width / 2;
          }
          else if (window.innerWidth < 1300 && window.innerWidth > 600) {
            canvas.width = 500;
            canvas.height = canvas.width / 2;
          }
          else if (window.innerWidth < 600) {
            canvas.width = 300;
            canvas.height = canvas.width / 2;
          }
        }
      }
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      canvas = canvasRef.current;
      ctx = canvas.getContext('2d');
      if (window.innerWidth > 1300) {
        canvas.width = 600;
        canvas.height = canvas.width / 2;
      }
      else if (window.innerWidth < 1300 && window.innerWidth > 600) {
        canvas.width = 500;
        canvas.height = canvas.width / 2;
      }
      else if (window.innerWidth < 600) {
        canvas.width = 300;
        canvas.height = canvas.width / 2;
      }
      socket.emit('canvaSize', { width: canvas.width, height: canvas.height });
    }
  }, []);

  const playGame = () => {
    socket.emit('playGame');
    console.log("Socket: ", socket);
  }


  useEffect(() => {
    playGame();
  }, [])

  const spectateGame = () => {
    // setinitialScreen(true);
    socket.emit('spectateGame', gameCodeInput.toString());
    init(0);
  }

  const handlSpectateState = (state: string) => {
    if (canvasRef.current) {
      if (ctx?.clearRect)
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      drawRect(ctx, 0, 0, canvas.width, canvas.height, "black");
      if (!gameActive) {
        // console.log("gameActive handlegame ret : ", gameActive);
        return;
      }
      let StateTemp = JSON.parse(state);
      requestAnimationFrame(() => paintGame(ctx, StateTemp, canvas.width, canvas.height));
    }
  }
  socket.off('spectateState').on('spectateState', handlSpectateState);

  // PAGE GAME
  const keydown = (e: any) => {
    socket.emit('keyDown', e.keyCode);
  }

  const handlInit = async (number: number) => {
    // setinitialScreen(true);
    setPlayerNamber(number);
    setGameActive(true);
  }
  socket.off('init').on('init', handlInit);

  const handlGameState = (gameState: string) => {
    if (canvasRef.current) {
      if (ctx?.clearRect)
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      drawRect(ctx, 0, 0, canvas.width, canvas.height, "black");
      document.addEventListener("keydown", keydown);
      if (!gameActive) {
        // console.log("gameActive handlegame ret : ", gameActive);
        return;
      }

      let StateTemp = JSON.parse(gameState);
      requestAnimationFrame(() => paintGame(ctx, StateTemp, canvas.width, canvas.height));
    }
  }
  socket.off('gameState').on('gameState', handlGameState);

  const handleGameOver = (data: any) => {
    if (!gameActive) {
      return;
    }
    data = JSON.parse(data);
    setGameActive(false);
    if (data === playerNamber) {
      alert('You Win!');
      // console.log('You Win!');
    }
    if (data !== playerNamber) {
      alert('You Lose :(');
      // console.log('You Lose :(');
    }
  }
  socket.off('gameOver').on('gameOver', handleGameOver);

  const handlePlayerDisconnected = (player: number) => {
    if (player !== playerNamber) {
      alert('Your opponent disconnected. You win!');
      // console.log('Your opponent disconnected. You win!');
    }
  }
  socket.off('playerDisconnected').on('playerDisconnected', handlePlayerDisconnected);

  const handleGameCode = (gameCode: string) => {
    setGameCodeDisplay(gameCode);
  }
  socket.off('gameCode').on('gameCode', handleGameCode);

  let x = 0;
  const handleWaiting = () => {
    drawText(ctx, ". ", (canvas.width / 2 - 12) + x, canvas.height / 2, "white", 600 / canvas.width);
    x += 10;
    if (x === 40) {
      x = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  socket.off('waiting').on('waiting', handleWaiting);
  
  let countDown = 3;
  const handleStarting = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawText(ctx, countDown.toString(), canvas.width / 2, canvas.height / 2, "white", 600 / canvas.width);
    countDown--;
  }
  socket.off('start').on('start', handleStarting);

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div>
          <div id='gameScreen'>
            <h1>your game code is: <span id='gameCodeDisplay'>{gameCodeDisplay}</span> </h1>
            <div style={{ display: "flex", justifyContent: "center" }} >
              <canvas ref={canvasRef} style={{ border: "1px solid #c3c3c3", backgroundColor: "black" }}></canvas>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Game