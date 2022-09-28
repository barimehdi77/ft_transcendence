import { useEffect, useState, useRef, useContext } from 'react';
import { paintGame, drawText } from '../components/drawing/drawing';
import { socket } from '../socket';
import { UserContext } from '../contexts/userContext';

import Router, { withRouter } from 'next/router';
import Head from 'next/head';

const Game = () => {
	const { userInfo }: any = useContext(UserContext);
	const canvasRef = useRef(null);
	let canvas: HTMLCanvasElement;
	let ctx: any;

	// const [gameCodeInput, setGameCodeInput] = useState('');
	// const [gameCodeDisplay, setGameCodeDisplay] = useState('');
	const [gameActive, setGameActive] = useState(false);
	const [playerNamber, setPlayerNamber] = useState(0);
	const [randomColor, setRandomColor] = useState(0);

	const color = [
		{ back: "#000000", front: "#ffffff" },
		{ back: "#003459", front: "#d9d9d9" },
		{ back: "#461220", front: "#fed0bb" },
		{ back: "#590d22", front: "#ffccd5" },
		{ back: "#184e77", front: "#d9ed92" },
	];

	const init = (player: number) => {
		setGameActive(true);
		setPlayerNamber(player);
	};

	if (typeof window !== 'undefined') {
		// console.log(window.innerWidth, ' ', window.innerHeight);
		window.onresize = () => {
			if (gameActive) {
				if (canvasRef.current) {
					if (window.innerWidth > 1300) {
						canvas.width = 600;
						canvas.height = canvas.width / 2;
					} else if (window.innerWidth < 1300 && window.innerWidth > 600) {
						canvas.width = 500;
						canvas.height = canvas.width / 2;
					} else if (window.innerWidth < 600) {
						canvas.width = 300;
						canvas.height = canvas.width / 2;
					}
				}
			}
		};
	}

	if (canvasRef.current) {
		canvas = canvasRef.current;
		ctx = canvas.getContext('2d');
		if (window.innerWidth > 1300) {
			canvas.width = 600;
			canvas.height = canvas.width / 2;
		} else if (window.innerWidth < 1300 && window.innerWidth > 600) {
			canvas.width = 500;
			canvas.height = canvas.width / 2;
		} else if (window.innerWidth < 600) {
			canvas.width = 300;
			canvas.height = canvas.width / 2;
		}
	}

	const playGame = (type: string) => {
		if (type === "random") {


			socket.emit('playGame', { userInfo, type: "random" }, (ret: number) => setRandomColor(ret));
		}
		else {
			// console.log("friend: ", type);
			socket.emit('playGame', { userInfo, type: "friend" }, (ret: number) => setRandomColor(ret));
		}
		setGameActive(true);
	};

	useEffect(() => {
		if (Router.query.name === "friends")
			playGame("friend");
		else
			playGame("random");
		// console.log("withRouter: ", );// withRouter.name);
		// setRandomColor(Math.floor(Math.random() * 4));
	}, []);

	// const spectateGame = () => {
	// 	// setinitialScreen(true);
	// 	socket.emit('spectateGame', gameCodeInput.toString());
	// 	init(0);
	// };

	// const handlSpectateState = (state: string) => {
	// 	if (canvasRef.current) {
	// 		if (ctx?.clearRect) ctx?.clearRect(0, 0, canvas.width, canvas.height);
	// 		drawRect(ctx, 0, 0, canvas.width, canvas.height, 'black');
	// 		if (!gameActive) {
	// 			return;
	// 		}
	// 		let StateTemp = JSON.parse(state);
	// 		requestAnimationFrame(() =>
	// 			paintGame(ctx, StateTemp, canvas.width, canvas.height)
	// 		);
	// 	}
	// };
	// socket.off('spectateState').on('spectateState', handlSpectateState);

	// PAGE GAME
	const keydown = (e: any) => {
		socket.emit('keyDown', e.keyCode);
	};

	const handlInit = async (number: number) => {
		setPlayerNamber(number);
		setGameActive(true);
	};
	socket.off('init').on('init', handlInit);

	const handlGameState = (gameState: string) => {
		if (canvasRef.current) {
			if (ctx?.clearRect) ctx?.clearRect(0, 0, canvas.width, canvas.height);
			// drawRect(ctx, 0, 0, canvas.width, canvas.height, '#2ec4b6');
			document.addEventListener('keydown', keydown);
			if (!gameActive) {
				return;
			}
			let StateTemp = JSON.parse(gameState);
			requestAnimationFrame(() =>
				paintGame(ctx, StateTemp, canvas.width, canvas.height)
			);
		}
	};
	socket.off('gameState').on('gameState', handlGameState);

	const handleGameOver = (data: number) => {
		// console.log('gameA: ', gameActive);

		if (!gameActive) return;
		// const dataa = data.toString();
		setGameActive(false);
		console.log('d: ', data, " ", typeof (data), ' p: ', playerNamber, " ", typeof (playerNamber));

		if (playerNamber == 0) {
			alert('Game Over');
			Router.push('/');
		} else {
			if (data == playerNamber) {
				alert('You Win!');
				Router.push('/');
			}
			if (data != playerNamber) {
				alert('You Lose :(');
				Router.push('/');
			}
		}
	};
	socket.off('gameOver').on('gameOver', handleGameOver);

	const handlePlayerDisconnected = (player: number) => {
		// console.log(player, " !== ", playerNamber);
		if (player !== playerNamber) {
			alert('Your opponent disconnected. You win!');
			Router.push('/');
		}
	};
	socket.off('playerDisconnected').on('playerDisconnected', handlePlayerDisconnected);

	// const handleGameCode = (gameCode: string) => {
	// 	setGameCodeDisplay(gameCode);
	// };
	// socket.off('gameCode').on('gameCode', handleGameCode);

	let x = 0;
	const handleWaiting = () => {
		drawText(
			ctx,
			'. ',
			canvas.width / 2 - 12 + x,
			canvas.height / 2,
			color[randomColor].front,
			600 / canvas.width,
			45
		);
		x += 10;
		if (x === 40) {
			x = 0;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}
	};
	socket.off('waiting').on('waiting', handleWaiting);

	let countDown = 3;
	const handleStarting = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawText(
			ctx,
			countDown.toString(),
			canvas.width / 2,
			canvas.height / 2,
			color[randomColor].front,
			600 / canvas.width,
			45
		);
		countDown--;
	};
	socket.off('start').on('start', handleStarting);

	const handlPlayers = (players: string) => {
		console.log('3iiiw', JSON.parse(players));
	};
	socket.off('handlPlayers').on('handlPlayers', handlPlayers);

	return (
		<div className='min-h-screen flex justify-center items-center'>
			<Head>
				<title>Game</title>
			</Head>
			<div>
				<div id='gameScreen'>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<canvas
							ref={canvasRef}
							style={{ border: '1px solid #c3c3c3', backgroundColor: color[randomColor].back }}
						></canvas>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Game;
