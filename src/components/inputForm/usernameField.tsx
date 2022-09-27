import Label from './label';

const UsernameField = ({ login, setUsername }: any) => {
	return (
		<>
			<Label name='username' />
			<input
				type='text'
				id='username'
				placeholder={login}
				onChange={(e) => {
					const result = e.target.value.replace(/[^a-zA-Z0-9-_]/g, '');
					e.target.value = result;
					setUsername(result);
				}}
				className='bg-gray-100 px-4 py-2 rounded-full mb-5'
			/>
		</>
	);
};

export default UsernameField;
