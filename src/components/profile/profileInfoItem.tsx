import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const profileInfoItem = ({ icon, field, info }: any) => {
	return (
		<div className='item flex items-center mb-6'>
			<div className='bg-white w-8 h-8 flex items-center justify-center mr-3 rounded-full drop-shadow-[0_0px_4px_rgba(0,0,0,0.25)]'>
				<FontAwesomeIcon icon={icon} />
			</div>
			<div className=''>
				<p className='text-sm text-neutral-500'>{field}</p>
				<h2 className='font-semibold'>{info}</h2>
			</div>
		</div>
	);
};

export default profileInfoItem;
