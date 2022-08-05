import axios, { AxiosError } from 'axios';

export const getUserData = async () => {
	const url = 'http://localhost:8080/api/user';
	// const url = 'http://localhost:8080/api/profile/me';
	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	};
	try {
		const res = await axios.get(url, config);
		console.log("headers", res);
		console.log('data', res.data);
		
		return res.data;
	} catch (error: any) {
		console.log(error);
		if (error.response)
				return error.response.data;
	}
};
