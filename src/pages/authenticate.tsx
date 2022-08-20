import Router from 'next/router';
import { useState } from 'react';
import { sendPassCode } from '../components/2FA/sendPassCode';

const Authenticate = () => {
	const [passcode, setPasscode] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	async function sendCode() {
		try {
			const res = await sendPassCode(passcode);
			console.log(res);
			if (res?.statusText === 'OK') {
				Router.push('/');
			}
		} catch (error: any) {
			setErrorMessage(error.response.data.message);
		}
	}

	return (
		<main className='min-h-screen flex flex-col items-center justify-center'>
			<div className='drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mt-20'>
				<div className='bg-sky-800 px-10 py-4 rounded-t-3xl	'>
					<h2 className='text-2xl text-white text-center font-semibold capitalize'>
						enter your 6-digit 2FA key
					</h2>
				</div>
				<div className='bg-white px-10 py-4 rounded-b-3xl flex flex-col'>
					<input
						placeholder='2FA key'
						type='text'
						className='bg-gray-100 px-4 py-2 my-2 rounded-full border border-slate-300'
						onChange={(e) => {
							setPasscode(e.target.value);
						}}
					/>
					<button
						onClick={sendCode}
						className='bg-sky-800 px-6 py-2 w-min my-3 m-auto text-l text-white font-semibold capitalize rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-sky-700 hover:scale-105'
					>
						submit
					</button>
					{errorMessage ? (
						<p className='bg-red-200 text-red-700 py-2 rounded-full pl-4 border border-red-700'>
							{errorMessage}
						</p>
					) : null}
				</div>
			</div>
		</main>
	);
};

export default Authenticate;
