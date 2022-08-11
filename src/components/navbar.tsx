import NavbarItems from './navbarItems';

const Navbar = () => {
	return (
		<nav
			className='bg-sky-800 flex justify-between items-center w-screen px-32 py-4 fixed z-10'
			style={{ minWidth: '700px' }}
		>
			<h1 className='text-3xl text-white uppercase font-bold'>
				<a href='/'>king pong</a>
			</h1>
			<div className='items'>
				<NavbarItems />
			</div>
		</nav>
	);
};

export default Navbar;
