import axios from "axios";
import cookie from 'js-cookie';

export const getUserData = async () => {
	const url = 'http://localhost:8080/api/user';
	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	};
	const res = await axios.get(url, config);
	return res.data;
}