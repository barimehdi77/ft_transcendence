import UserInputFrom from '../components/userInputForm';

import { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';

const Setup = () => {
	const token = cookie.get('token') as string;
	const [userInfo, setUserInfo] = useState({});

	useEffect(() => {
		async function getUserData() {
			const url = 'http://localhost:8080/api/user';
			localStorage.setItem('token', token);
			const config = {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			};
			const res = await axios.get(url, config);
			console.log(res.data);
			
			setUserInfo(res.data);
		}
		getUserData();
	}, []);

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
