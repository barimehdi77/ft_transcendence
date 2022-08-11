import {
	faCoins,
	faTableTennisPaddleBall,
	faCircleCheck,
	faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

import ProfileInfoItem from './profileInfoItem';

const ProfileStats = ({ profileData }:any) => {
	return (
		<>
			<ProfileInfoItem icon={faCoins} field='Points' info='42 Pts' />
			<ProfileInfoItem
				icon={faTableTennisPaddleBall}
				field='Games Played'
				info={profileData.profile.played_games}
			/>
			<ProfileInfoItem
				icon={faCircleCheck}
				field='Wins'
				info={profileData.profile.wins}
			/>
			<ProfileInfoItem
				icon={faCircleXmark}
				field='Losses'
				info={profileData.profile.losses}
			/>
		</>
	);
};

export default ProfileStats;
