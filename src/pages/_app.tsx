import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import type { AppProps } from 'next/app';
import Router from 'next/router';

import cookie from 'js-cookie';
import Layout from '../components/layout';
import { getData } from '../components/getData';


import SocketProvider from "../components/chat/socket_context/index";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
	const token = cookie.get('token') as string;
	const [userInfo, setUserInfo] :any = useState({});

	useEffect(() => {
		if (token && Router.pathname !== '/authenticate') {
			localStorage.setItem('token', token);
			cookie.remove('token');
		}
		async function fillUserData() {
			const user = await getData('http://localhost:8080/api/user');
			if (Router.pathname !== '/authenticate') {
				if (user.statusCode! === 401) Router.push('/login');
				else if (
					!user.profile_done ||
					(user.statusCode! === 477 && Router.pathname !== '/setup')
				)
					Router.push('/setup');
				if (
					(user.statusCode! !== 401 &&
						Router.pathname === '/login' &&
						user.profile_done) ||
					(user.profile_done && Router.pathname === '/setup')
				)
					Router.push('/');
			}
			setUserInfo(user);
		}
		fillUserData();
	}, []);

	return (
		<UserContext.Provider value={{ userInfo, setUserInfo }}>
			<SocketProvider>
				<Layout>
					<ToastContainer />
					<Component {...pageProps} />
				</Layout>
			</SocketProvider>
		</UserContext.Provider>
	);
}

export default MyApp;
