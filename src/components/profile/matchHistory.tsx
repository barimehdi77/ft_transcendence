import { useEffect, useState } from 'react';
import { getData } from '../getData';
import Score from './score';

const MatchHistory = ({ profileData }: any) => {
	const [matchHistory, setMatchHistory]: any = useState();
	const { user_name } = profileData;

	useEffect(() => {
		async function getMatchHistory() {
			setMatchHistory(
				await getData(`http://localhost:8080/api/profile/${user_name}/matches`)
			);
		}
		getMatchHistory();
	}, []);

	return (
		<section className='m-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
			<div className='drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mt-20'>
				<div className='bg-sky-800 px-10 py-4 rounded-t-3xl	'>
					<h2 className='text-2xl text-white text-center font-semibold capitalize'>
						match history
					</h2>
				</div>
				<div className='bg-white px-10 py-4 rounded-b-3xl text-center'>
					<h2 className=' font-semibold capitalize mb-2'>
						<span className='text-green-600'>
							{profileData.profile.wins} Wins
						</span>{' '}
						-
						<span className='text-red-500'>
							{' '}
							{profileData.profile.losses} Losses
						</span>
					</h2>
					{matchHistory
						? matchHistory.data.map((match: any, key: number) => {
								return <Score match={match} key={key} />;
						  })
						: null}
				</div>
			</div>
		</section>
	);
};

export default MatchHistory;
