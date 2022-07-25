const SubmitButton = () => {
	return (
		<div className='flex justify-center'>
			<button
				type='submit'
				form='user-info'
				className='bg-sky-800 px-12 py-4 text-xl text-white font-semibold uppercase rounded-full'
			>
				Start
			</button>
		</div>
	);
};

export default SubmitButton;
