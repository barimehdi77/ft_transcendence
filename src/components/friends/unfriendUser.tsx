import axios from 'axios';
export const unfriendUser = async (id: number) => {
	const url = `http://localhost:8080/api/friends/${id}`;
	const config = {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	};
	const res = await axios.delete(url, config);
	return res;
};
