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
	
	if (friendsList) friendsList.data?.length !== 1 ? (plural = 's') : null;

	const playGame = (user: any) => {
		console.log("botton clicked");
		
		socket.emit('question', {
			sender: { name: userInfo.user_name },
			to: { name: user.user_name },
			// roomName: Math.floor(Math.random() * 1000000)
		// }, (ret: string) => {
		// 	// if (ret == "yes") {
		// 	// 	socket.emit('playWithFriend');
		// 	// }
		// 	console.log("return: ", ret);
		});
		// Router.push('/game');
		// console.log("user ", user.user_name, " want to play with: ", userInfo.user_name);

	}

	const accept = () => {
		// Router.push('/game');
		Router.push({
			pathname: "/game",
			query: { name: "friends"}
		});
	}
	socket.off('urFriendAccepted').on('urFriendAccepted', accept)

	return (
		<>
			{friendsList && friendsList.data ? (
				<div>
					<p>
						{friendsList.data.length} friend{plural}
					</p>
					{friendsList.data.map((request: any, key: number) => {
						const user = request.to;
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
									<button onClick={() => {playGame(user)}} className='bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 mr-2 hover:bg-sky-700'>
										Play Game
									</button>
									<button className='bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 mr-2 hover:bg-sky-700'>
										Message
									</button>
                  <Link
                    href={{
                      pathname: "/dms",
                      query: { id: user.intra_id },
                    }}
                  >
                    <a  className="bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 mr-2 hover:bg-sky-700">Message</a>
                  </Link>
									{user.profile.status === 'ONLINE' ? (
										<button className='bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 mr-2 hover:bg-sky-700'>
											Play Game
										</button>
									) : (
										<button className='bg-slate-500 text-white font-medium rounded-3xl py-2 px-4 mr-2 cursor-default'>
											Unavailable
										</button>
									)}
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
