import { useEffect, useState, useRef, useContext } from 'react';
import { paintGame, drawText, paintGameOver } from '../components/drawing/drawing';
import { socket } from '../socket';
import { UserContext } from '../contexts/userContext';

import Router from 'next/router';
import Head from 'next/head';

const Game = () => {
	const { userInfo }: any = useContext(UserContext);
	const canvasRef = useRef(null);
	let canvas: HTMLCanvasElement;
	let ctx: any;
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
			socket.emit('playGame', { userInfo, type: "friend" }, (ret: number) => setRandomColor(ret));
		}
		setGameActive(true);
	};

	useEffect(() => {
		if (Router.query.name === "friends")
			playGame("friend");
		else
		{
			playGame("random");
		}
	}, []);

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

	const handleGameOver = (data: any) => {
		if (!gameActive) return;
		data = JSON.parse(data);
		setGameActive(false);
		if (playerNamber == 0) {
			let temp = 3;
			const interval = setInterval(() => {
				temp--;
					paintGameOver(ctx, "You Win", data.stateRoom, canvas.width, canvas.height);

				if (temp === 0) {
					clearInterval(interval);
					Router.push('/');
				}
			}, 500);
		} else {
			if (data.winner == playerNamber) {
				let temp = 3;
				const interval = setInterval(() => {
					paintGameOver(ctx, "You Win", data.stateRoom, canvas.width, canvas.height);
					temp--;
					if (temp === 0) {
						clearInterval(interval);
						Router.push('/');
					}
				}, 1000);
			}
			if (data.winner != playerNamber) {
				let temp = 3;
				const interval = setInterval(() => {
					paintGameOver(ctx, "You Lose", data.stateRoom, canvas.width, canvas.height)
					temp--;
					if (temp === 0) {
						clearInterval(interval);
						Router.push('/');
					}
				}, 1000);
			}
		}
	};
	socket.off('gameOver').on('gameOver', handleGameOver);

	const handlePlayerDisconnected = (player: any) => {
		player = JSON.parse(player);
		if (player.winner !== playerNamber) {
			let temp = 3;
			const interval = setInterval(() => {
				temp--;
					paintGameOver(ctx, "You win!", player.stateRoom, canvas.width, canvas.height);
				if (temp === 0) {
					clearInterval(interval);
					Router.push('/');
				}
			}, 1000);
		}
	};
	socket.off('playerDisconnected').on('playerDisconnected', handlePlayerDisconnected);

	let x = 0;
	const handleWaiting = () => {
		drawText( ctx, '. ', canvas.width / 2 - 12 + x, canvas.height / 2,
		color[randomColor].front, 600 / canvas.width, 45);

		drawText(ctx, "W: up", 10, canvas.height - 10,
		color[randomColor].front, 600 / canvas.width, 35)
		
		drawText(ctx, "S: down", canvas.width / 3.3, canvas.height - 10,
		color[randomColor].front, 600 / canvas.width, 35)

		drawText(ctx, "first to 5 wins", canvas.width / 1.55, canvas.height - 10,
		color[randomColor].front, 600 / canvas.width, 35)
		x += 10;
		if (x === 40) {
			x = 0;
			ctx.clearRect(0, 0, canvas.width, canvas.height - 50);
		}
	};
	socket.off('waiting').on('waiting', handleWaiting);

	let countDown = 3;
	const handleStarting = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height - 50);
		drawText(
			ctx,
			countDown.toString(),
			canvas.width / 2,
			canvas.height / 2,
			color[randomColor].front,
			600 / canvas.width,
			45
		);
		drawText(ctx, "W: up", 10, canvas.height - 10,
		color[randomColor].front, 600 / canvas.width, 35)
		
		drawText(ctx, "S: down", canvas.width / 3.3, canvas.height - 10,
		color[randomColor].front, 600 / canvas.width, 35)

		drawText(ctx, "first to 5 wins", canvas.width / 1.55, canvas.height - 10,
		color[randomColor].front, 600 / canvas.width, 35)
		countDown--;
	};
	socket.off('start').on('start', handleStarting);

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
