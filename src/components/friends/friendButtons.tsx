import { addFriend } from './addFriend';

const FriendButtons = ({ intra_id }: any) => {
	const handleClick = async () => {
		try {
			const res = await addFriend(intra_id);
			console.log(res);

			// const res = await sendPassCode(passcode);
			// if (res.data.status === 'success') {
			// 	async function fillUserData() {
			// 		const user = await getData('http://localhost:8080/api/user');
			// 		setUserInfo(user);
			// 	}
			// 	fillUserData();
			// }
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<div className='flex items-center justify-start'>
			<button
				className='bg-white px-4 py-2 mt-2 mr-2 text-sky-800 font-semibold rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-white hover:scale-105'
				onClick={handleClick}
			>
				Add Friend
			</button>
			<button className='bg-white px-4 py-2 mt-2 ml-2 text-sky-800 font-semibold rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-white hover:scale-105'>
				Block
			</button>
		</div>
	);
};

export default FriendButtons;
