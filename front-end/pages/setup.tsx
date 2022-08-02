import UserInputFrom from '../components/userInputForm';
import { getUserData } from '../components/getUserData';

import { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';

const Setup = () => {
	const token = cookie.get('token') as string;
	const [userInfo, setUserInfo] = useState({});
	
	useEffect(() => {
		localStorage.setItem('token', token);
		async function fillUserData() {
			setUserInfo(await getUserData())
		}
		fillUserData();
	}, []);
	console.log('hello', userInfo);

	
	return (
		<main className='min-h-screen flex flex-col justify-center'>
			<h1 className='text-center text-5xl font-bold'>Setup your profile</h1>
			<UserInputFrom
				userInfo={userInfo}
			/>
		</main>
	);
};

export default Setup;
