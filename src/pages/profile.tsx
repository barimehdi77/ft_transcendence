import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import { faUser, faTag } from '@fortawesome/free-solid-svg-icons';

import { getProfileData } from '../components/profile/getProfileData';
import ProfileInfoItem from '../components/profile/profileInfoItem';
import ProfileHeader from '../components/profile/profileHeader';
import ProfileStats from '../components/profile/profileStats';

const Profile = () => {
	const { userInfo } = useContext(UserContext);
	const [profileData, setProfileData]: any = useState({});

	useEffect(() => {
		async function fillProfileData() {
			setProfileData(await getProfileData());
		}
		fillProfileData();
	}, []);

	return (
		<main className='min-h-screen flex flex-col items-center justify-center'>
			<div className='drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mt-20'>
				<ProfileHeader />
				<div className='bg-white px-10 py-4 rounded-b-3xl'>
					<ProfileInfoItem
						icon={faUser}
						field='Full Name'
						info={userInfo.first_name + ' ' + userInfo.last_name}
					/>
					<ProfileInfoItem icon={faTag} field='Login' info={userInfo.login} />
					{profileData.status === 'success' ? (
						<ProfileStats profileStats={profileData.data.profile} />
					) : null}
				</div>
			</div>
		</main>
	);
};

export default Profile;
