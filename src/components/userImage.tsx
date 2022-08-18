import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';

const UserImage = () => {
	const { userInfo } = useContext(UserContext);

	return (
		<img
			src={userInfo.image_url}
			alt='User Avatar'
			className='w-12 h-12 rounded-full ml-4'
		/>
	);
};

export default UserImage;
