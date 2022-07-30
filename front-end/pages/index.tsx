import type { NextPage } from 'next';
import React from 'react';
import styles from '../styles/login.module.css';

const Home: NextPage = () => {
	return (
		<main
			className='min-h-screen flex flex-col items-center justify-center'
			style={{ minWidth: '900px' }}
		>
			<div>
				<h1 className='text-center text-6xl font-extrabold uppercase'>
					king pong
				</h1>
				<img src='/Gorilla.png' alt='Gorilla Logo' className='m-auto w-1/2' />
				<div className='flex justify-center'>
					<button className='bg-sky-800 rounded-full  py-2 px-6 text-white uppercase font-semibold cursor-pointer hover:bg-sky-700 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:scale-105'>
						<a
							href='http://localhost:8080/api/auth/login'
							className='flex items-center justify-center'
						>
							<img src='/42-logo.png' alt='42 Logo' className='w-12 mr-4' />
							login with intra
						</a>
					</button>
				</div>
			</div>
		</main>
	);
};

export default Home;
