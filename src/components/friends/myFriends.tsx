import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getData } from '../getData';
import { unfriendUser } from './unfriendUser';

const MyFriends = ({
	friendRequests,
	setFriendRequests,
	friendsList,
	setFriendsList,
}: any) => {
	let plural = '';
	useEffect(() => {
		async function fillData() {
			setFriendsList(await getData('http://localhost:8080/api/friends'));
		}
		fillData();
	}, []);

	async function handleUnfriend(id: number) {
		try {
			const res = await unfriendUser(id);
			setFriendsList(await getData('http://localhost:8080/api/friends'));
			console.log('unfriend', res);
		} catch (error) {
			console.log(error);
		}
	}

	console.log(friendsList);

	if (friendsList) friendsList.data.length !== 1 ? (plural = 's') : null;

	return (
		<>
			{friendsList ? (
				<div>
					<p>
						{friendsList.data.length} friend{plural}
					</p>
					{friendsList.data.map((request: any, key: number) => {
						const user = request.to;
						console.log('user', user);
						
						let color = 'bg-green-500';
						if (user.profile.status === 'OFFLINE') color = 'bg-red-600';
						else if (user.profile.status === 'INGAME') color = 'bg-amber-500';

						return (
							<div key={key} className='mt-4 flex items-center'>
								<Link href={`/profile/${user.user_name}`}>
									<div className='flex items-end'>
										<img
											src={user.image_url}
											alt='User Avatar'
											className='w-16 h-16 object-cover rounded-full cursor-pointer'
										/>
										<div
											className={`w-5 h-5 rounded-full ${color} -ml-4 border-2`}
										></div>
									</div>
								</Link>
								<div className='ml-4'>
									<Link href={`/profile/${user.user_name}`}>
										<h4 className='text-xl font-medium mb-2 cursor-pointer'>
											{user.user_name}
										</h4>
									</Link>
									<button
										className='bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 mr-2 hover:bg-sky-700'
										onClick={() => handleUnfriend(request.id)}
									>
										Unfriend
									</button>
									<button className='bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 mr-2 hover:bg-sky-700'>
										Play Game
									</button>
									<button className='bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 mr-2 hover:bg-sky-700'>
										Message
									</button>
								</div>
							</div>
						);
					})}
				</div>
			) : null}
		</>
	);
};

export default MyFriends;
