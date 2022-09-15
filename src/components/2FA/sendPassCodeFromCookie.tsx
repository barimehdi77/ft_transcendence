import axios from 'axios';
import cookie from 'js-cookie';

export const sendPassCodeFromCookie = async (passcode: string) => {
	const url = 'http://localhost:8080/api/auth/turn-on';
	const config = {
		headers: {
			Authorization: `Bearer ${cookie.get('token')}`,
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
