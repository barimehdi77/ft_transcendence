const Input = (props: any) => {
	return (
		<input
			type='text'
			id={props.name}
			name={props.name}
			placeholder={props.placeholder}
			className='bg-gray-100 px-4 py-2 rounded-full mb-5'
		/>
	);
};

export default Input;
