import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

import MenuItem from './menuItem';
import UserImage from '../userImage';

const NavbarItems = () => {
	const { userInfo } = useContext(UserContext);

	return (
		<ul className='flex items-center'>
			<MenuItem path='play' />
			<MenuItem path='chat' />
			<MenuItem path='friends' />
			<li className='text-white text-xl font-semibold ml-12 hover:text-cyan-300'>
				<a href='/profile' className='flex items-center'>
					{userInfo.user_name}
					<UserImage />
				</a>
			</li>
		</ul>
	);
};

export default NavbarItems;
