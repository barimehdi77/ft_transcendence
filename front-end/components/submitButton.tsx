const SubmitButton = (props: any) => {
	const sendData = (e: any) => {
		console.log(e.target);
	};

	return (
		<div className='flex justify-center'>
			<button
				onClick={sendData}
				className='bg-sky-800 px-12 py-4 text-xl text-white font-semibold uppercase rounded-full'
			>
				Start
			</button>
		</div>
	);
};

export default SubmitButton;
