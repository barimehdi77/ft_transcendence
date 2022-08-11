import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import UserImage from '../userImage';

const ProfileHeader = () => {
	const { userInfo } = useContext(UserContext);

	return (
		<div className='bg-sky-800 flex items-center px-10 py-4 rounded-t-3xl	'>
			<div className='header-info text-neutral-100'>
				<h2 className='text-xl font-semibold inline'>{userInfo.user_name}</h2>
				<FontAwesomeIcon icon={faMedal} className='text-teal-500 ml-2' />
				<p>{userInfo.email}</p>
			</div>
			<UserImage />
		</div>
	);
};

export default ProfileHeader;
