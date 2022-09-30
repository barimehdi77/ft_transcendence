import Router from 'next/router';
import { socket } from '../../socket';
import { getData } from '../getData';


const Logout = () => {
	const logUserOut = async () => {
		await getData('http://localhost:8080/api/auth/logout')
		localStorage.removeItem('token');
		Router.reload()
		socket.disconnect();
	};
	return <button onClick={logUserOut}>Logout</button>;
};

export default Logout;
