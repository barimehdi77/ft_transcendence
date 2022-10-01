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
		try {
			await acceptRequest(id);
			setFriendRequests(
				await getData('http://localhost:8080/api/friends/request')
			);
			setFriendsList(await getData('http://localhost:8080/api/friends'));
		} catch (error) {
			console.log(error);
		}
	};

	const handleDecline = async (id: number) => {
		try {
			await declineRequest(id);
			setFriendRequests(
				await getData('http://localhost:8080/api/friends/request')
			);
			setFriendsList(await getData('http://localhost:8080/api/friends'));
		} catch (error) {
			console.log(error);
		}
	};

	if (friendRequests) friendRequests.data?.length !== 1 ? (plural = 's') : null;

	return (
		<>
			{friendRequests && friendRequests.data ? (
				<div>
					<p>
						{friendRequests.data.length} friend request{plural}
					</p>
					{friendRequests.data.map((request: any, key: number) => {
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
										<div className={`w-5 h-5 rounded-full ${color} -ml-4 border-2`}></div>
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
										onClick={() => handleAccept(request.id)}
									>
										Accept
									</button>
									<button
										className='bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 hover:bg-sky-700'
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

{
	/* <div className='flex items-end'>
	<img
		src={user.image_url}
		alt='User Avatar'
		className='w-16 h-16 object-cover rounded-full cursor-pointer'
	/>
	<div className='w-4 h-4 rounded-full bg-green-500 -ml-4 border-2'></div>
</div>; */
}
