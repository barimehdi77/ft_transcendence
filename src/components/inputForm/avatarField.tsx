import Label from './label';

const AvatarField = ({ file, setFile }: any) => {
	return (
		<>
			<Label name='avatar' />
			<div className='bg-gray-100 px-4 py-3 rounded-full mb-5 text-gray-400'>
				<label
					htmlFor='avatar'
					className='bg-sky-800 text-white px-3 py-1 rounded-full mr-2 cursor-pointer hover:bg-sky-700'
				>
					Choose
				</label>
				{file ? file.name : 'no file selected'}
			</div>
			<input
				type='file'
				id='avatar'
				className='hidden'
				accept='image/png, image/jpeg, image/jpg'
				onChange={(e) => {
					if (!e.target.files) return;
					setFile(e.target.files[0]);
				}}
			/>
		</>
	);
};

export default AvatarField;
