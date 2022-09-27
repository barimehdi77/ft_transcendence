import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getData } from '../../components/getData';
import ProfileView from '../../components/profile/profileView';
import Head from 'next/head';

const Profile = () => {
	const username: any = useRouter().query.userId;
	const [profileData, setProfileData]: any = useState();

	useEffect(() => {
		async function fillUserData() {
			const user = await getData(
				`http://localhost:8080/api/profile/${username}`
			);
			setProfileData(user);
		}
		if (username) fillUserData();
	}, [username]);

	if (profileData) {
		if (profileData.status! === 'success')
			return (
				<>
					<Head>
						<title>{profileData.data.user_name}</title>
					</Head>
					<ProfileView
						profileData={profileData}
						setProfileData={setProfileData}
					/>
				</>
			);
		else if (profileData.status! === 'success')
			return (
				<main className='min-h-screen flex flex-col items-center justify-center'>
					<Head>
						<title>User not found</title>
					</Head>
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
		else return <></>;
	}
};

export default Profile;
