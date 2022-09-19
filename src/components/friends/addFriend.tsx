import axios from 'axios';
export const addFriend = async () => {
	const url = 'http://localhost:8080/api/friends/request';
	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	};
	const res = await axios.post(
		url,
		{
			to: 62473,
		},
		config
	);
	return res;
};
