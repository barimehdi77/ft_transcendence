import { addFriend } from './addFriend';
import { blockUser } from './blockUser';
import { unblockUser } from './unblockUser';
import { getData } from '../getData';

const AddAndBlockButtons = ({ profileData, setProfileData }: any) => {
	const handleAdd = async () => {
		try {
			await addFriend(profileData.intra_id);
			setProfileData(
				await getData(
					`http://localhost:8080/api/profile/${profileData.user_name}`
				)
			);
		} catch (error: any) {
			console.log(error);
		}
	};

	const handleBlock = async () => {
		try {
			await blockUser(profileData.intra_id);
			setProfileData(
				await getData(
					`http://localhost:8080/api/profile/${profileData.user_name}`
				)
			);
		} catch (error: any) {
			console.log(error);
		}
	};

	const handleUnblock = async () => {
		try {
			await unblockUser(profileData.intra_id);
			setProfileData(
				await getData(
					`http://localhost:8080/api/profile/${profileData.user_name}`
				)
			);
		} catch (error: any) {
			console.log(error);
		}
	};

	console.log(profileData);

	return (
		<div className='flex items-center justify-start'>
			{profileData.isFriends === null ? (
				<button
					className='bg-white px-4 py-2 mt-2 mr-2 text-sky-800 font-semibold rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-white hover:scale-105'
					onClick={handleAdd}
				>
					Add Friend
				</button>
			) : null}
			{profileData.isFriends === 'ACCEPTED' ? (
				<button className='bg-gray-600 px-4 py-2 mt-2 mr-2 text-white font-semibold rounded-full cursor-default drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
					Friends
				</button>
			) : null}
			{profileData.isFriends === 'PENDING' ? (
				<button className='bg-gray-600 px-4 py-2 mt-2 mr-2 text-white font-semibold rounded-full cursor-default drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
					Pending...
				</button>
			) : null}
			{profileData.isFriends === 'BLOCKED' ? (
				<button
					className='bg-white px-4 py-2 mt-2 mr-2 text-sky-800 font-semibold rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-white hover:scale-105'
					onClick={handleUnblock}
				>
					Unblock
				</button>
			) : (
				<button
					className='bg-white px-4 py-2 mt-2 mr-2 text-sky-800 font-semibold rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-white hover:scale-105'
					onClick={handleBlock}
				>
					Block
				</button>
			)}
		</div>
	);
};

export default AddAndBlockButtons;
