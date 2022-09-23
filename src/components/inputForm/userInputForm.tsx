import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import axios from 'axios';
import Router from 'next/router';

import UsernameField from './usernameField';
import AvatarField from './avatarField';

import { getData } from '../getData';

const UserInputForm = () => {
	const { userInfo, setUserInfo } :any = useContext(UserContext);
	const url = 'http://localhost:8080/api/user/setup';
	const login = userInfo.login;
	const [username, setUsername] = useState(login);
	const [file, setFile]: any = useState();
	const [errorMessage, setErrorMessage] = useState();

	const sendData = async (e: any) => {
		e.preventDefault();
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		};
		try {
			const data = new FormData();
			data.append('user_name', username ? username : login);
			data.append('avatar', file);
			const res = await axios.post(url, data, config);
			if (res.status === 200) {
				async function fillUserData() {
					const user = await getData('http://localhost:8080/api/user');
					setUserInfo(user);
				}
				fillUserData();
				Router.push('/');
			}
		} catch (error: any) {
			console.log(error);
			setErrorMessage(error.response.data.message);
		}
	};

	return (
		<>
			<form
				action='#'
				className='w-2/3 max-w-xl m-auto rounded-3xl bg-white flex flex-col p-8 my-12 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
			>
				<UsernameField login={login} setUsername={setUsername} />
				<AvatarField file={file} setFile={setFile} />
				{errorMessage ? (
					<p className='bg-red-200 text-red-700 py-2 rounded-full pl-4 border border-red-700'>
						{errorMessage}
					</p>
				) : null}
				<button
					onClick={sendData}
					className='bg-sky-800 w-min m-auto px-12 py-2 text-xl text-white font-semibold uppercase rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-sky-700 hover:scale-105'
				>
					Start
				</button>
			</form>
			<div className='flex justify-center'></div>
		</>
	);
};

export default UserInputForm;
