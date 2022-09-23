import axios from 'axios';
export const acceptRequest = async (id: number) => {
	const url = `http://localhost:8080/api/friends/request/${id}`;
	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	};
	const res = await axios.patch(url, {}, config);
	return res;
};
