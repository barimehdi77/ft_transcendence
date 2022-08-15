import {
	faCoins,
	faTableTennisPaddleBall,
	faCircleCheck,
	faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

import ProfileInfoItem from './profileInfoItem';

const ProfileStats = ({ profileStats }: any) => {
	return (
		<>
			<ProfileInfoItem icon={faCoins} field='Points' info={profileStats.user_points} />
			<ProfileInfoItem
				icon={faTableTennisPaddleBall}
				field='Games Played'
				info={profileStats.played_games}
			/>
			<ProfileInfoItem
				icon={faCircleCheck}
				field='Wins'
				info={profileStats.wins}
			/>
			<ProfileInfoItem
				icon={faCircleXmark}
				field='Losses'
				info={profileStats.losses}
			/>
		</>
	);
};

export default ProfileStats;
