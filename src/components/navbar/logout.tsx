import Router from 'next/router';

const Logout = () => {
	const logUserOut = () => {
		localStorage.removeItem('token');
		console.log('clicked');
		Router.reload()
	};
	return <button onClick={logUserOut}>Logout</button>;
};

export default Logout;
