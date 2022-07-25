import UserInputFrom from '../components/userInputForm';

import { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import Axios from 'axios';

const Setup = () => {
	const token = cookie.get('token') as string;
	const url = 'http://localhost:8080/api/user';
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const [userInfo, setUserInfo] = useState({});


	useEffect(() => {
		async function getUserData() {
			const res = await Axios.get(url, config);
			setUserInfo(res.data);
		}
		getUserData();
	}, []);	

	return (
		<div className='bg-hero-pattern bg-cover bg-center h-screen flex flex-col justify-center'>
			<h1 className='text-center text-5xl font-bold'>Setup your profile</h1>
			<UserInputFrom userInfo={userInfo}/>
		</div>
	);
};

export default Setup;
