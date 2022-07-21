import type { NextPage } from 'next';
import React from 'react';
import styles from '../styles/login.module.css';

// function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
// 	e.preventDefault();
// 	window.location.href =
// 		'https://api.intra.42.fr/oauth/authorize?client_id=41f9a237a56553748d98c4b803438728f91444b39b0cf4dff86f88874431bb6f&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&response_type=code';
// }

const Home: NextPage = () => {
	return (
		<main className={styles.main}>
			<div className={styles.hero}>
				<h1>king pong</h1>
				<img src='/Gorilla.png' alt='Gorilla Logo' />
			</div>
			<div className={styles.signup}>
				<h3>Sign up to play</h3>
				<button>
					<a href='http://localhost:8080/api/auth/login'>
						<img src='/42-logo.png' alt='42 Logo' />
						login with intra
					</a>
				</button>
			</div>
		</main>
	);
};

export default Home;
