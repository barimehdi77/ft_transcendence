import Link from 'next/link';
import NavbarItem from './navbarItem';
import Dropdown from './dropdown';
import HamburgerMenu from './hamburgerMenu';

const Navbar = () => {
	return (
		<nav className='bg-sky-800 flex justify-between items-center w-screen px-32 py-2 fixed z-10'>
			<HamburgerMenu />
			<h1 className='text-3xl text-white uppercase font-bold hidden lg:inline'>
				<Link href='/'>king pong</Link>
			</h1>
			<div className='items'>
				<ul className='flex items-center'>
					<NavbarItem path='/game' pagename='play' />
					<NavbarItem path='/chat' pagename='chat' />
					<NavbarItem path='/friends' pagename='friends' />
					<Dropdown />
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
