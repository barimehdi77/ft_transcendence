import Label from '../components/label';
import Input from '../components/input';
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
		async function test() {
			// let header = new Headers();
			// const res = await fetch('http://localhost:8080/api/user', {
			// mode: 'no-cors',
			// headers: {
			// 	Authorization: `Bearer ${token}`,
			// },
			// });
			// header.append('Authorization', `Bearer ${token}`);
			// console.log(res);
			const res = await Axios.get(url, config);
			setUserInfo(res.data);
		}
		test();
	});	

	return (
		<div className='bg-hero-pattern bg-cover bg-center h-screen flex flex-col justify-center'>
			<h1 className='text-center text-5xl font-bold'>Setup your profile</h1>
			<UserInputFrom userInfo={userInfo}/>
		</div>
	);
};

export default Setup;
