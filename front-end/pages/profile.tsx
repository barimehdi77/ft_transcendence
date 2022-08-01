import { useEffect, useState } from 'react';
import { getUserData } from '../components/getUserData';

import ProfileInfoItem from '../components/profileInfoItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMedal,
	faUser,
	faTag,
	faCoins,
	faTableTennisPaddleBall,
	faCircleCheck,
	faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
	const [userInfo, setUserInfo] = useState({});
	useEffect(() => {
		async function fillUserData() {
			const data = await getUserData();			
			setUserInfo(data);
		}
		fillUserData();
	}, []);


	return (
		<main className='min-h-screen flex flex-col items-center justify-center'>
			<div className='profile drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
				<div className='header bg-sky-800 flex items-center px-10 py-4 rounded-t-3xl	'>
					<div className='header-info text-neutral-100'>
						<h2 className='text-xl font-semibold inline'>
							{userInfo.user_name}
						</h2>
						<FontAwesomeIcon icon={faMedal} className='text-teal-500' />
						<p>{userInfo.email}</p>
					</div>
					<div className='avatar w-16 ml-5'>
						<img
							src='/download.jpeg'
							alt='User avatar'
							className='rounded-full'
						/>
					</div>
				</div>

				<div className='main-info bg-white px-10 py-4 rounded-b-3xl'>
					<ProfileInfoItem
						icon={faUser}
						field='Full Name'
						info={userInfo.first_name + ' ' + userInfo.last_name}
					/>
					<ProfileInfoItem icon={faTag} field='Login' info={userInfo.login} />
					<ProfileInfoItem icon={faCoins} field='Points' info='42 Pts' />
					<ProfileInfoItem
						icon={faTableTennisPaddleBall}
						field='Games Played'
						info='33'
					/>
					<ProfileInfoItem icon={faCircleCheck} field='Wins' info='25' />
					<ProfileInfoItem icon={faCircleXmark} field='Losses' info='8' />
				</div>
			</div>
		</main>
	);
};

export default Profile;
