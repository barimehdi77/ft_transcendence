import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { faUser, faTag } from '@fortawesome/free-solid-svg-icons';

import ProfileInfoItem from '../../components/profile/profileInfoItem';
import ProfileHeader from '../../components/profile/profileHeader';
import ProfileStats from '../../components/profile/profileStats';
import MatchHistoryButton from '../../components/profile/matchHistoryButton';
import { getData } from '../../components/getData';

const Profile = () => {
	const username: any = useRouter().query.userId;
	const [profileData, setprofileData]: any = useState();

	useEffect(() => {
		async function fillUserData() {
			const user = await getData(
				`http://localhost:8080/api/profile/${username}`
			);
			setprofileData(user);
		}
		if (username) fillUserData();
	}, [username]);

	console.log(profileData);

	if (profileData) {
		if (profileData.status! === 'failure')
			return (
				<main className='min-h-screen flex flex-col items-center justify-center'>
					<h1 className='text-5xl font-bold text-sky-900 mb-4'>This user does not exist</h1>
					<img
						src='/snoop-dog-who.gif'
						alt=''
						className='rounded-2xl border-2 border-neutral-800 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
					/>
				</main>
			);
		else
			return (
				<main className='min-h-screen flex flex-col items-center justify-center'>
					{profileData.status === 'success' ? (
						<div className='drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mt-20'>
							<ProfileHeader profileData={profileData.data} />
							<div className='bg-white px-10 py-4 rounded-b-3xl'>
								<ProfileInfoItem
									icon={faUser}
									field='Full Name'
									info={
										profileData.data.first_name +
										' ' +
										profileData.data.last_name
									}
								/>
								<ProfileInfoItem
									icon={faTag}
									field='Login'
									info={profileData.data.login}
								/>
								<ProfileStats profileStats={profileData.data.profile} />
								<MatchHistoryButton profileStats={profileData.data.profile} />
							</div>
						</div>
					) : null}
				</main>
			);
	}
};

export default Profile;
