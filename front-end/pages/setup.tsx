import cookie from 'js-cookie';
import Label from '../components/label';
import Input from '../components/input';
import { useEffect, useState } from 'react';

const Setup = () => {
	const token = cookie.get('access_token') as string;

	useEffect(() => {
		async function test() {
			console.log(token);
			let header = new Headers();
			const res = await fetch('http://localhost:8080/api/user', {
				mode: 'no-cors',
				headers: { Authorization: `Bearer ${token}` },
			});
			// header.append("Authorization", `Bearer ${token}`);
			console.log(await res.json());
		}

		test();
	});

	const [file, setFile] = useState('no file selected');

	return (
		<div className='bg-hero-pattern bg-cover bg-center h-screen flex flex-col justify-center'>
			<h1 className='text-center text-5xl font-bold'>Setup your profile</h1>
			<form
				action=''
				className='w-2/3 max-w-xl m-auto rounded-3xl bg-white flex flex-col p-8 my-12'
				method=''
				id='user-info'
			>
				<Label name='username' />
				<Input name='username' placeholder='login' />
				<Label name='avatar' />
				<div className='bg-gray-100 px-4 py-3 rounded-full mb-5 text-gray-400'>
					<label
						htmlFor='avatar'
						className='bg-sky-800 text-white px-3 py-1 rounded-full mr-2 cursor-pointer'
					>
						Choose
					</label>
					{file}
				</div>
				<input
					type='file'
					id='avatar'
					name='avatar'
					className='hidden'
					onChange={(e) => {
						setFile(e.target.files[0].name);
					}}
				/>
			</form>
			<div className='flex justify-center'>
				<button
					type='submit'
					form='user-info'
					className='bg-sky-800 px-12 py-4 text-xl text-white font-semibold uppercase rounded-full'
				>
					Start
				</button>
			</div>
		</div>
	);
};

export default Setup;
