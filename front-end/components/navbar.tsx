import MenuItem from './menuItem';

const Navbar = () => {
	return (
		<nav className='bg-sky-800 flex justify-between items-center w-screen px-32 fixed z-10'>
			<h1 className='text-3xl text-white uppercase font-bold'>king pong</h1>
			<div className='items'>
				<ul className='flex items-center'>
					<MenuItem path='play' />
					<MenuItem path='chat' />
					<MenuItem path='friends' />
					<li className='text-white text-xl font-semibold ml-14'>
						<a href='/profile' className='flex items-center'>
							Abderr
							<img
								src='/download.jpeg'
								alt='User Avatar'
								className='w-12 rounded-full my-5 ml-5'
							/>
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
