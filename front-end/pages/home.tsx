const Home = () => {
	return (
		<main className='bg-hero-pattern bg-cover bg-center h-screen flex flex-col justify-center'>
			<div className='flex justify-center'>
				<button className='bg-sky-800 text-7xl text-white uppercase font-bold rounded-full py-14 px-24 mb-10'>
					<i className='fa-solid fa-table-tennis-paddle-ball'></i>
					<a href='/play'>play</a>
				</button>
			</div>
			<div className='flex justify-center'>
				<button className='bg-sky-800 text-5xl text-white uppercase font-semibold rounded-full py-6 px-16'>
					<a href='/chat'>chat</a>
				</button>
			</div>
		</main>
	);
};

export default Home;
