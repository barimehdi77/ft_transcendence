import { useEffect, useRef, useState } from 'react';
import { socket } from '../socket';
import { paintGame, drawRect } from '../components/drawing/drawing';
import Head from 'next/head';

const Spectate = () => {
	const [data, setData]: any = useState(null);
	// const [code, setCode] = useState(false);
	const [table, setTable] = useState(true);
	const canvasRef = useRef(null);
	const [gameActive, setActive] = useState(false);
	let canvas: HTMLCanvasElement;
	let ctx: any;

	if (typeof window !== 'undefined') {
		// console.log(window.innerWidth, ' ', window.innerHeight);
		window.onresize = () => {
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

	const updateplayers = (msg: string) => {
		// console.log('update: ', msg);
		setData(JSON.parse(msg));
		setTable(true);
		setActive(false);
	};
	socket.off('updateplayers').on('updateplayers', updateplayers);

	const listOfPlayersPlaying = (msg: string) => {
		// console.log('listOfPlayersPlaying: ', msg);
		setData(JSON.parse(msg));
	};
	socket.off('listOfPlayersPlaying').on('listOfPlayersPlaying', listOfPlayersPlaying);

	useEffect(() => {
		const getData = () => {
			socket.emit('listOfPlayersPlaying', (ret: any) => {
				// console.log(ret);
				setData(ret);
			});
		};
		getData();
	}, [table]);

	const handlSpectateState = (state: string) => {
		if (canvasRef.current) {
			ctx?.clearRect(0, 0, canvas.width, canvas.height);
			drawRect(ctx, 0, 0, canvas.width, canvas.height, 'black');
			if (!gameActive)
				return;
			let StateTemp = JSON.parse(state);
			requestAnimationFrame(() =>
				paintGame(ctx, StateTemp, canvas.width, canvas.height)
			);
		}
		// console.log('handlSpectateState');
	};
	socket.off('spectateState').on('spectateState', handlSpectateState);

	const showGame = (gamecode: string) => {
		setTable(false);
		setActive(true);
		// console.log("gamecode ", gamecode);
		socket.emit('spectateGame', gamecode);
	};

	const ShowList = () => {
		setTable(true);
		setActive(false);
		socket.emit('stop');
		// emit stop 			create var stop play
	};

	return (
		<>
			<Head>
				<title>Spectate</title>
			</Head>
			{table ? (
				<div className='min-h-screen flex flex-col items-center justify-center'>
					<h1 className='font-bold text-2xl mb-2'>Live Games:</h1>
					{data
						? Object.keys(data).map((elem: any) => {
							return (
								<div className='flex justify-between items-center'>
									<h2 className='font-semibold text-xl mr-4'>
										{data[elem].p1}
									</h2>
									<h2 className='font-semibold text-xl mr-8'>
										{data[elem].p2}
									</h2>
									<button
										className='bg-sky-800 px-4 py-2 text-white font-semibold rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-sky-700 hover:scale-105'
										onClick={() => showGame(elem)}
									>
										Watch
									</button>
								</div>
							);
						})
						: null}
				</div>
			) : (
				<div>
					<div className='min-h-screen flex flex-col justify-center items-center'>
						<canvas
							ref={canvasRef}
							style={{ border: '1px solid #c3c3c3', backgroundColor: 'black' }}
						></canvas>
						<button
							className='bg-sky-800 px-4 py-2 mt-4 text-white font-semibold rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-sky-700 hover:scale-105'
							onClick={() => ShowList()}
						>
							Back to List
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Spectate;
