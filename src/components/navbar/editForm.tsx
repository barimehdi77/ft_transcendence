import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import AvatarField from '../inputForm/avatarField';
import UsernameField from '../inputForm/usernameField';
import axios from 'axios';

import { getData } from '../getData';
import Router from 'next/router';

const EditForm = ({ handleCloseModal }: any) => {
	const { userInfo, setUserInfo }: any = useContext(UserContext);
	const [username, setUsername] = useState(userInfo.user_name);
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
			data.append('user_name', username ? username : userInfo.user_name);
			data.append('avatar', file);
			const res = await axios.post(
				'http://localhost:8080/api/user/setup',
				data,
				config
			);
			if (res.status === 200) {
				setUserInfo(await getData('http://localhost:8080/api/user'));
				Router.reload();
				handleCloseModal();
			}
		} catch (error: any) {
			console.log(error);
			setErrorMessage(error.response.data.message);
		}
	};

	return (
		<form
			action='#'
			className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 max-w-xl m-auto rounded-3xl bg-white flex flex-col p-8 my-12 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
		>
			<UsernameField login={username} setUsername={setUsername} />
			<AvatarField file={file} setFile={setFile} />
			{errorMessage ? (
				<p className='bg-red-200 text-red-700 mb-4 py-2 rounded-full pl-4 border border-red-700'>
					{errorMessage}
				</p>
			) : null}
			<button
				onClick={sendData}
				className='bg-sky-800 px-6 py-2 w-min m-auto text-xl text-white font-semibold capitalize rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-sky-700 hover:scale-105'
			>
				submit
			</button>
		</form>
	);
};

export default EditForm;
