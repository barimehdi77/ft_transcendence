import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getData } from '../getData';

const MyFriends = () => {
	const [friendsList, setFriendsList]: any = useState();
	let plural = '';

	useEffect(() => {
		async function fillData() {
			setFriendsList(await getData('http://localhost:8080/api/friends'));
		}
		fillData();
	}, []);

	if (friendsList) friendsList.data.length !== 1 ? (plural = 's') : null;

	return (
		<>
			{friendsList ? (
				<div>
					<p>
						{friendsList.data.length} friend{plural}
					</p>
					{friendsList.data.map((request: any, id: number) => {
						const user = request.to;
						return (
							<div key={id} className='mt-4 flex items-center'>
								<Link href={`/profile/${user.user_name}`}>
									<img
										src={user.image_url}
										alt='User Avatar'
										className='w-16 h-16 object-cover rounded-full'
									/>
								</Link>
								<div className='ml-4'>
									<Link href={`/profile/${user.user_name}`}>
										<h4 className='text-xl font-medium mb-2'>
											{user.user_name}
										</h4>
									</Link>
									<button className='bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 mr-2'>
										Play Game
									</button>
									<button className='bg-sky-800 text-white font-medium rounded-3xl py-2 px-4 mr-2'>
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
