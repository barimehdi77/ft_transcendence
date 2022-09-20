import axios from 'axios';

export const sendPassCodeFromCookie = async (passcode: string, token: string) => {
	const url = 'http://localhost:8080/api/auth/turn-on';
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const res = await axios.post(
		url,
		{
			twoFactorAuthenticationCode: passcode,
		},
		config
	);
	return res;
};
