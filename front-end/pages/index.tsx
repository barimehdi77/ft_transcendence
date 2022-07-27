import type { NextPage } from 'next';
import React from 'react';
import styles from '../styles/login.module.css';

const Home: NextPage = () => {
	return (
		<main
			className='bg-hero-pattern bg-cover bg-center h-screen flex justify-center items-center'
			style={{ minWidth: '900px' }}
		>
			<div className='w-3/5 text-center text-6xl font-extrabold uppercase'>
				<h1>king pong</h1>
				<img src='/Gorilla.png' alt='Gorilla Logo' className='m-auto w-1/2' />
			</div>
			<div className='w-2/5'>
				<h3 className='font-bold text-4xl mb-6'>Sign up to play</h3>
				<button>
					<a
						href='http://localhost:8080/api/auth/login'
						className='bg-sky-800 rounded-full flex items-center justify-center py-2 px-6 text-white uppercase font-semibold cursor-pointer'
					>
						<img src='/42-logo.png' alt='42 Logo' className='w-12 mr-4' />
						login with intra
					</a>
				</button>
			</div>
		</main>
	);
};

export default Home;


// import type { NextPage } from 'next';
// import React from 'react';
// import styles from '../styles/login.module.css';

// // function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
// // 	e.preventDefault();
// // 	window.location.href =
// // 		'https://api.intra.42.fr/oauth/authorize?client_id=41f9a237a56553748d98c4b803438728f91444b39b0cf4dff86f88874431bb6f&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&response_type=code';
// // }

// const Home: NextPage = () => {
// 	return (
// 		<main
// 			className='bg-hero-pattern bg-cover bg-center h-screen'
// 			style={{ minWidth: '900px' }}
// 		>
// 			<h1 className='text-center text-6xl font-extrabold uppercase'>
// 				king pong
// 			</h1>
// 			<img src='/Gorilla.png' alt='Gorilla Logo' className='m-auto w-1/3' />
// 			<button>
// 				<a
// 					href='http://localhost:8080/api/auth/login'
// 					className='bg-sky-800 rounded-full flex items-center justify-center py-2 px-6 text-white uppercase font-semibold cursor-pointer'
// 				>
// 					<img src='/42-logo.png' alt='42 Logo' className='w-12 mr-4' />
// 					login with intra
// 				</a>
// 			</button>
// 		</main>
// 	);
// };

// export default Home;
