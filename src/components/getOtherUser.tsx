import axios from 'axios';

export const getOtherUser = async (username: any) => {
	const url = `http://localhost:8080/api/profile/${username}`;
	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	};
	try {
		const res = await axios.get(url, config);
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response) return error.response.data;
	}
};
