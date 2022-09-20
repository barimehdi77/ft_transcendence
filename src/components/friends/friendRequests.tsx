import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getData } from '../getData';

const FriendRequests = () => {
	const [friendRequests, setFriendRequests]: any = useState();
	let plural = '';

	useEffect(() => {
		async function fillData() {
			setFriendRequests(
				await getData('http://localhost:8080/api/friends/request')
			);
		}
		fillData();
	}, []);

	const handleAccept = () => {
		console.log('accepted');
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
					{friendRequests.data.map((request: any, id: number) => {
						const user = request.to;
						return (
							<div key={id} className='mt-4 flex items-center'>
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
										onClick={handleAccept}
									>
										Accept
									</button>
									<button className='bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 mr-2'>
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
