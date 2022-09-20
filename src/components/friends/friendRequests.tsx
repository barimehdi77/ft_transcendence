import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getData } from '../getData';
import { acceptRequest } from './acceptRequest';
import { declineRequest } from './declineRequest';

const FriendRequests = ({
	friendRequests,
	setFriendRequests,
	friendsList,
	setFriendsList,
}: any) => {
	let plural = '';

	useEffect(() => {
		async function fillData() {
			setFriendRequests(
				await getData('http://localhost:8080/api/friends/request')
			);
		}
		fillData();
	}, []);

	const handleAccept = async (id: number) => {
		const res = await acceptRequest(id);
		async function fillData() {
			setFriendRequests(
				await getData('http://localhost:8080/api/friends/request')
			);
			setFriendsList(await getData('http://localhost:8080/api/friends'));
		}
		fillData();
		console.log('accepted', res);
	};

	const handleDecline = async (id: number) => {
		const res = await declineRequest(id);
		async function fillData() {
			setFriendRequests(
				await getData('http://localhost:8080/api/friends/request')
			);
			setFriendsList(await getData('http://localhost:8080/api/friends'));
		}
		fillData();
		console.log('declined', res);
	};

	console.log(friendRequests);

	if (friendRequests) friendRequests.data.length !== 1 ? (plural = 's') : null;

	return (
		<>
			{friendRequests ? (
				<div>
					<p>
						{friendRequests.data.length} friend request{plural}
					</p>
					{friendRequests.data.map((request: any, key: number) => {
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
										className='bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 mr-2'
										onClick={() => handleAccept(request.id)}
									>
										Accept
									</button>
									<button
										className='bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 mr-2'
										onClick={() => handleDecline(request.id)}
									>
										Decline
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

export default FriendRequests;
