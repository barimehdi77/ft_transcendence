import UserInputFrom from '../components/userInputForm';
import { useEffect, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { getUserData } from '../components/getUserData';

const Setup = () => {
	const { userInfo, setUserInfo } = useContext(UserContext);

	// useEffect(() => {
	// 	async function fillUserData() {
	// 		const user = await getUserData();
	// 		// if (user.profile_done)
	// 		setUserInfo(user);
	// 	}
	// 	fillUserData();
	// }, []);

	// console.log(userInfo);
	
	return (
		<main className='min-h-screen flex flex-col justify-center'>
			<h1 className='text-center text-5xl font-bold'>Setup your profile</h1>
			<UserInputFrom/>
		</main>
	);
};

export default Setup;
