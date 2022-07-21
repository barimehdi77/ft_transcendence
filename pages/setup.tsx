import cookie from 'js-cookie';
import Label from '../components/label';
import Input from '../components/input';
import { useState } from 'react';

const Setup = () => {
	const token = cookie.get('access_token') as string;

	const [file, setFile] = useState();

	// function filehandle(e: Event) {

	// 	setFile(e.target.value[0]);
	// }

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
					{file ? file : "no file selected"}
				</div>
				<input
					type='file'
					// value={file}
					id='avatar'
					name='avatar'
					className='hidden'
					onChange={(e) => {
						console.log(e.target.files[0].name);
						
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
