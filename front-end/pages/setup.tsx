import UserInputFrom from '../components/userInputForm';

import { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import Axios from 'axios';

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
			const res = await Axios.get(url, config);
			setUserInfo(res.data);
		}
		getUserData();
	}, []);

	return (
		<div className='bg-hero-pattern bg-cover bg-center h-screen flex flex-col justify-center'>
			<h1 className='text-center text-5xl font-bold'>Setup your profile</h1>
			<UserInputFrom
				userInfo={userInfo}
			/>
		</div>
	);
};

export default Setup;
