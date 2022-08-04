import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';

import Navbar from './navbar';

const Layout = ({ children }: any) => {
	const { userInfo } = useContext(UserContext);

	return (
		<div className='bg-hero-pattern bg-cover bg-center'>
			{userInfo ? userInfo.ProfileDone ? <Navbar /> : null : null}
			<>{children}</>
		</div>
	);
};

export default Layout;
