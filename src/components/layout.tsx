import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import Router from 'next/router';

import Navbar from './navbar/navbar';

const Layout = ({ children }: any) => {
	const { userInfo } = useContext(UserContext);

	return (
		<div className='bg-hero-pattern bg-cover bg-center'>
			{userInfo ? (
				userInfo.profile_done
					&& Router.pathname !== '/authenticate'
					&& Router.pathname !== '/game'
					&& Router.pathname !== '/spectate'
					? (
						<Navbar />
					) : null
			) : null}
			<>{children}</>
		</div>
	);
};

export default Layout;
