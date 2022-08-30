import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getData } from '../../components/getData';
import ProfileView from '../../components/profile/profileView';

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

	if (profileData) {
		if (profileData.status! === 'failure')
			return (
				<main className='min-h-screen flex flex-col items-center justify-center'>
					<h1 className='text-4xl font-bold text-sky-900 mb-8'>
						User not found
					</h1>
					<img
						src='/snoop-dog-who.gif'
						alt=''
						className='rounded-2xl border-2 border-neutral-800 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
					/>
				</main>
			);
		else return <ProfileView profileData={profileData} />;
	}
};

export default Profile;
