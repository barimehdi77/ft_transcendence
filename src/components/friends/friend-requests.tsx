import { useEffect, useState } from 'react';
import { getData } from '../getData';

const FriendRequests = () => {
	const [friendRequests, setFriendRequests] = useState();

	useEffect(() => {
		async function fillData() {
			setFriendRequests(
				await getData('http://localhost:8080/api/friends/request')
			);
		}
		fillData();
	}, []);

	const friendTest = {
		user_name: 'mbari',
		image_url: 'https://cdn.intra.42.fr/users/mbari.jpg',
	};

	return (
		<>
			<div className='mt-4 flex items-center'>
				<img
					src={friendTest.image_url}
					alt='User Avatar'
					className='w-16 h-16 object-cover rounded-full ml-4'
				/>
				<div className='ml-4'>
					<h4 className='text-xl font-semibold mb-2'>{friendTest.user_name}</h4>
					<button className='bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 mr-2'>
						Accept
					</button>
					<button className='bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 mr-2'>
						Decline
					</button>
				</div>
			</div>
			<div className='w-60 h-0.5 bg-slate-300 mt-4 mx-auto'></div>
		</>
	);
};

export default FriendRequests;
