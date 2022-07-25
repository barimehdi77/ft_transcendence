import Label from '../components/label';
import Input from '../components/input';
import SubmitButton from '../components/submitButton';

import { useState } from 'react';

const UserInputForm = () => {
	const [file, setFile] = useState('no file selected');

	return (
		<>
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
					accept='image/png, image/jpeg, image/jpg'
					onChange={(e) => {
						if (!e.target.files) return;
						setFile(e.target.files[0].name);
					}}
				/>
			</form>
			<SubmitButton />
		</>
	);
};

export default UserInputForm;
