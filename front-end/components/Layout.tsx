import { useEffect, useState } from 'react';
// import Navbar from './navbar';

const Layout = ({ children }: any) => {
	// const [isLogged, setIsLogged] = useState(false);
	// useEffect(() => {
	// 	const isLoggedIn = () => {
	// 		console.log(localStorage.getItem('token'));
	// 		if (localStorage.getItem('token')) {
	// 			console.log('ksnfdons');
	// 			setIsLogged(true);
	// 		} else setIsLogged(false);
	// 	};
	// 	isLoggedIn();
	// }, [isLogged]);
	return (
		<div className='bg-hero-pattern bg-cover bg-center'>
			{/* {isLogged ? <Navbar /> : null} */}
			<>{children}</>
		</div>
	);
};

export default Layout;
