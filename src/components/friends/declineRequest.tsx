import axios from 'axios';
export const declineRequest = async (id: number) => {
	const url = `http://localhost:8080/api/friends/request/${id}`;
	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	};
	const res = await axios.delete(url, config);
	return res;
};
