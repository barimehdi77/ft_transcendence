import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

const ProfileHeader = ({ profileData }: any) => {
	const points = profileData.profile.user_points;
	let rank;

	if (points < 20) rank = 'text-yellow-700';
	else if (points > 20 && points < 40) rank = 'text-slate-300';
	else if (points > 59) rank = 'text-yellow-500';

	console.log(profileData);
	

	return (
		<div className='bg-sky-800 flex items-center px-10 py-4 rounded-t-3xl	'>
			<div className='text-neutral-100'>
				<h2 className='text-xl font-semibold inline'>
					{profileData.user_name}
				</h2>
				<FontAwesomeIcon icon={faMedal} className={`text-2xl ${rank} ml-2`} />
				<p>{profileData.email}</p>
			</div>
			<img
				src={profileData.image_url}
				alt='User Avatar'
				className='w-12 h-12 object-cover rounded-full ml-4'
			/>
		</div>
	);
};

export default ProfileHeader;
