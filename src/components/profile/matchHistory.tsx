const MatchHistory = () => {
	return (
		<section className='m-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
			<div className='drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mt-20'>
				<div className='bg-sky-800 px-10 py-4 rounded-t-3xl	'>
					<h2 className='text-2xl text-white text-center font-semibold capitalize'>
						match history
					</h2>
				</div>
				<div className='bg-white px-10 py-4 rounded-b-3xl'>
					<h2 className='text-center font-semibold capitalize'>
						<span className='text-green-600'>6 Wins</span> -
						<span className='text-red-500'> 3 Losses</span>
					</h2>
				</div>
			</div>
		</section>
	);
};

export default MatchHistory;
