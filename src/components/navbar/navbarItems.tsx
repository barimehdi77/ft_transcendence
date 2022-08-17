import NavbarItem from './navbarItem';
import Dropdown from './dropdown';

const NavbarItems = () => {
	return (
		<ul className='flex items-center'>
			<NavbarItem path='play' />
			<NavbarItem path='chat' />
			<NavbarItem path='friends' />
			<Dropdown />
		</ul>
	);
};

export default NavbarItems;
