const UserImage = ({ image_url, status }: any) => {
	let color = 'bg-green-500';
	if (status === 'OFFLINE') color = 'bg-red-600';
	else if (status === 'INGAME') color = 'bg-amber-500';
	return (
		<div className='flex items-end'>
			<img
				src={image_url}
				alt='User Avatar'
				className='w-12 h-12 object-cover rounded-full ml-4'
			/>
			<div className={`w-4 h-4 rounded-full ${color} -ml-4 border-2`}></div>
		</div>
	);
};

export default UserImage;
