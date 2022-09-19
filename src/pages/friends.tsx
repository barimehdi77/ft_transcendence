import FriendRequests from '../components/friends/friend-requests';
import MyFriends from '../components/friends/myFriends';

const Friends = () => {
	return (
		<main className='min-h-screen flex flex-col items-center justify-center'>
			<div className='drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mt-20'>
				<div className='bg-sky-800 px-10 py-4 rounded-t-3xl	'>
					<h2 className='text-2xl text-white text-center font-semibold capitalize'>
						friends
					</h2>
				</div>
				<div className='bg-white px-10 py-4 rounded-b-3xl flex flex-col'>
					<h3 className='text-2xl capitalize font-semibold'>
						friend requests:
					</h3>
					<div className='max-h-64 overflow-auto'>
						<FriendRequests />
					</div>
					<h3 className='text-2xl capitalize font-semibold mt-4'>friends:</h3>
					<div className='max-h-64 overflow-auto'>
						<MyFriends />
					</div>
				</div>
			</div>
		</main>
	);
};

export default Friends;
