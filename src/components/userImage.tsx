const UserImage = ({image_url} :any) => {

	return (
		<img
			src={image_url}
			alt='User Avatar'
			className='w-12 h-12 object-cover rounded-full ml-4'
		/>
	);
};

export default UserImage;
