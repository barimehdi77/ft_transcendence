import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

import UserImage from '../userImage';
import AddAndBlockButtons from '../friends/addAndBlockButtons';

const ProfileHeader = ({ profileData, setProfileData }: any) => {
	const { userInfo } = useContext(UserContext);
	const points = profileData.profile.user_points;
	let rank;

	if (points < 20) rank = 'text-yellow-700';
	else if (points > 20 && points < 40) rank = 'text-slate-300';
	else if (points > 59) rank = 'text-yellow-500';

	return (
		<div className='bg-sky-800 px-10 py-4 rounded-t-3xl	'>
			<div className='flex items-center'>
				<div className='text-neutral-100'>
					<h2 className='text-xl font-semibold inline'>
						{profileData.user_name}
					</h2>
					<FontAwesomeIcon icon={faMedal} className={`text-2xl ${rank} ml-2`} />
					<p>{profileData.email}</p>
				</div>
				<UserImage image_url={profileData.image_url} />
			</div>
			{profileData.user_name !== userInfo.user_name ? (
				<AddAndBlockButtons
					profileData={profileData}
					setProfileData={setProfileData}
				/>
			) : null}
		</div>
	);
};

export default ProfileHeader;
