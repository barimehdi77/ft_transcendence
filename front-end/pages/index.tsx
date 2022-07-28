import type { NextPage } from 'next';
import React from 'react';
import styles from '../styles/login.module.css';

const Home: NextPage = () => {
	return (
		<main
			className='bg-hero-pattern bg-cover bg-center h-screen flex flex-col justify-center'
			style={{ minWidth: '900px' }}
		>
			<div>
				<h1 className='text-center text-6xl font-extrabold uppercase'>
					king pong
				</h1>
				<img src='/Gorilla.png' alt='Gorilla Logo' className='m-auto w-1/3' />
				<div className='flex justify-center'>
					<button className='drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
						<a
							href='http://localhost:8080/api/auth/login'
							className='bg-sky-800 rounded-full flex items-center justify-center py-2 px-6 text-white uppercase font-semibold cursor-pointer hover:bg-sky-700'
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
