import { useEffect, useState } from 'react';
import { getData } from '../../components/getData';
import ProfileView from '../../components/profile/profileView';

const Profile = () => {
	const [profileData, setProfileData]: any = useState({});

	useEffect(() => {
		async function fillProfileData() {
			setProfileData(await getData('http://localhost:8080/api/profile/me'));
		}
		fillProfileData();
	}, []);

	return <ProfileView profileData={profileData} />;
};

export default Profile;
