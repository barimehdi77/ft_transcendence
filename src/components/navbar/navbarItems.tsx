import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

import NavbarItem from './navbarItem';
import Dropdown from './dropdown';

const NavbarItems = () => {
	const { userInfo } = useContext(UserContext);

	return (
		<ul className='flex items-center'>
			<NavbarItem path='play' />
			<NavbarItem path='chat' />
			<NavbarItem path='friends' />
			<li className='flex items-center text-white text-xl font-semibold ml-12'>
				<a href='/profile' className='hover:text-cyan-300'>
					{userInfo.user_name}
				</a>
				<Dropdown />
			</li>
		</ul>
	);
};

export default NavbarItems;
