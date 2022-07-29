import Label from '../components/label';

import { useState } from 'react';
import axios from 'axios';

const UserInputForm = (props: any) => {
	const url = 'http://localhost:8080/api/user/setup';
	const login = props.userInfo.login;
	const [username, setUsername] = useState(login);
	const [file, setFile] = useState('no file selected');

	const sendData = async (e: any) => {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		};
		try {
			const res = await axios.post(
				url,
				{ user_name: username ? username : login, image_url: file },
				config
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<form
				action='#'
				className='w-2/3 max-w-xl m-auto rounded-3xl bg-white flex flex-col p-8 my-12 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
			>
				<Label name='username' />
				<input
					type='text'
					id='username'
					placeholder={login}
					onChange={(e) => {
						const { value } = e.target;
						setUsername(value);
					}}
					className='bg-gray-100 px-4 py-2 rounded-full mb-5'
				/>
				<Label name='avatar' />
				<div className='bg-gray-100 px-4 py-3 rounded-full mb-5 text-gray-400'>
					<label
						htmlFor='avatar'
						className='bg-sky-800 text-white px-3 py-1 rounded-full mr-2 cursor-pointer hover:bg-sky-700'
					>
						Choose
					</label>
					{file}
				</div>
				<input
					type='file'
					id='avatar'
					className='hidden'
					accept='image/png, image/jpeg, image/jpg'
					onChange={(e) => {
						if (!e.target.files) return;
						const file = e.target.files[0];
						setFile(file.name);
					}}
				/>
			</form>
			<div className='flex justify-center'>
				<button
					onClick={sendData}
					className='bg-sky-800 px-12 py-4 text-xl text-white font-semibold uppercase rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-sky-700 hover:scale-105'
				>
					Start
				</button>
			</div>
		</>
	);
};

export default UserInputForm;
