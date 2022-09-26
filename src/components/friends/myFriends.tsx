import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { getData } from '../getData';
import { unfriendUser } from './unfriendUser';
import { socket } from '../../socket';

import { UserContext } from '../../contexts/userContext';
import Router from 'next/router';

const MyFriends = ({
	friendRequests,
	setFriendRequests,
	friendsList,
	setFriendsList,
}: any) => {
	const { userInfo }: any = useContext(UserContext);
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

	// console.log(friendsList);

	if (friendsList) friendsList.data.length !== 1 ? (plural = 's') : null;

	const playGame = (user: any) => {
		socket.emit('question', {
			sender: { name: userInfo.user_name },
			to: { name: user.user_name }
		}, (ret: string) => {
			// if (ret == "yes") {
			// 	socket.emit('playWithFriend');
			// }
			console.log("return: ", ret);
		})
		// console.log("user ", user.user_name, " want to play with: ", userInfo.user_name);
	}

	const accept = () => {
		Router.push('/game');
	}
	socket.off('goToPlay').on('goToPlay', accept)

	return (
		<>
			{friendsList ? (
				<div>
					<p>
						{friendsList.data.length} friend{plural}
					</p>
					{friendsList.data.map((request: any, key: number) => {
						const user = request.to;
						return (
							<div key={key} className='mt-4 flex items-center'>
								<Link href={`/profile/${user.user_name}`}>
									<img
										src={user.image_url}
										alt='User Avatar'
										className='w-16 h-16 object-cover rounded-full cursor-pointer'
									/>
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
									<button onClick={() => {playGame(user)}} className='bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 mr-2 hover:bg-sky-700'>
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
