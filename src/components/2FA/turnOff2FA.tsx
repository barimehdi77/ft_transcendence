import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { getData } from '../getData';

const TurnOff2FA = () => {
	const { userInfo, setUserInfo } = useContext(UserContext);

	async function turnOff2FA() {
		const res = await getData('http://localhost:8080/api/auth/turn-off');
		if (res.status === 'success') {
			async function fillUserData() {
				const user = await getData('http://localhost:8080/api/user');
				setUserInfo(user);
			}
			fillUserData();
		}
	}

	return <button onClick={turnOff2FA}>Turn off 2FA</button>;
};

export default TurnOff2FA;
