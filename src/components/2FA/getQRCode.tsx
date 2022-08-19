import axios from 'axios';

export const getQRCode = async () => {
	const url = 'http://localhost:8080/api/auth/generate2fa';
	const config: any = {
		responseType: 'blob',
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
