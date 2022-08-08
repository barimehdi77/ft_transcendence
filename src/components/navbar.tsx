import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';

import MenuItem from './menuItem';

const Navbar = () => {
	const { userInfo } = useContext(UserContext);

	return (
		<nav className='bg-sky-800 flex justify-between items-center w-screen px-32 py-4 fixed z-10'>
			<h1 className='text-3xl text-white uppercase font-bold'>
				<a href='/'>king pong</a>
			</h1>
			<div className='items'>
				<ul className='flex items-center'>
					<MenuItem path='play' />
					<MenuItem path='chat' />
					<MenuItem path='friends' />
					<li className='text-white text-xl font-semibold ml-14'>
						<a href='/profile' className='flex items-center'>
							{userInfo.user_name}
							<img
								src='/download.jpeg'
								alt='User Avatar'
								className='w-12 rounded-full ml-4'
							/>
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
