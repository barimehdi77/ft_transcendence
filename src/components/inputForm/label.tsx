const Label = ({name}: any) => {
	return (
		<label htmlFor={name} className='text-xl font-bold capitalize my-1'>
			{name}
		</label>
	);
};

export default Label;
