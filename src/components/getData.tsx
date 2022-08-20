import axios from 'axios';

export const getData = async (url: any) => {
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
