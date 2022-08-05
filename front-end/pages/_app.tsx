import { useEffect, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import { getUserData } from '../components/getUserData';
import cookie from 'js-cookie';

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import Router from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
	const token = cookie.get('token') as string;
	const [userInfo, setUserInfo] = useState({});

	useEffect( () => {
		localStorage.setItem('token', token);
		async function fillUserData() {
			const user = await getUserData();
			if (!user) Router.push('/login');
			if (!user.profile_done) Router.push('/setup');
			setUserInfo(user);
		}
		fillUserData();
		
	}, []);

	return (
		<UserContext.Provider value={{ userInfo, setUserInfo }}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</UserContext.Provider>
	);
}

export default MyApp;
