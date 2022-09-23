import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

const Score = ({ match }: any) => {
	const { userInfo }: any = useContext(UserContext);
	const { player_one, player_two } = match;
	let p1_classes = '';
	let p2_classes = '';

	if (player_one.name === userInfo.user_name) {
		p1_classes += 'font-semibold ';
		if (player_one.score > player_two.score) p1_classes += 'text-green-600 ';
		else p1_classes += 'text-red-700 ';
	} else {
		p2_classes += 'font-semibold ';
		if (player_two.score > player_one.score) p2_classes += 'text-green-600 ';
		else p2_classes += 'text-red-700 ';
	}

	return (
		<h1 className='font-medium'>
			<span className={p1_classes}>
				{player_one.name} {player_one.score}
			</span>
			{' - '}
			<span className={p2_classes}>
				{player_two.score} {player_two.name}
			</span>
		</h1>
	);
};

export default Score;
