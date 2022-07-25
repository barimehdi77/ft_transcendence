import Label from '../components/label';
import Input from '../components/input';
import FileInput from './fileInput';
import SubmitButton from '../components/submitButton';

import { useState } from 'react';

const UserInputForm = (props) => {
	const [username, setUsername] = useState('no file selected');
	const [data, setData] = useState({});

	return (
		<>
			<form
				action='#'
				className='w-2/3 max-w-xl m-auto rounded-3xl bg-white flex flex-col p-8 my-12'
			>
				<Label name='username' />
				<Input name='username' placeholder='login' />
				<Label name='avatar' />
				<FileInput />
			</form>
			<SubmitButton updatedData={data}/>
		</>
	);
};

export default UserInputForm;
