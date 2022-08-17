import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

import UserImage from '../userImage';

const ProfileHeader = ({ points }: any) => {
	const { userInfo } = useContext(UserContext);
	let rank;

	if (points < 20) rank = 'text-yellow-700';
	else if (points > 20 && points < 40) rank = 'text-slate-300';
	else if (points > 59) rank = 'text-yellow-500';

	return (
		<div className='bg-sky-800 flex items-center px-10 py-4 rounded-t-3xl	'>
			<div className='text-neutral-100'>
				<h2 className='text-xl font-semibold inline'>{userInfo.user_name}</h2>
				<FontAwesomeIcon icon={faMedal} className={`text-2xl ${rank} ml-2`} />
				<p>{userInfo.email}</p>
			</div>
			<UserImage />
		</div>
	);
};

export default ProfileHeader;
