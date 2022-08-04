import axios from 'axios';

export const getUserData = async () => {
	const url = 'http://localhost:8080/api/user';
	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	};
	try {
		const res = await axios.get(url, config);
		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};
