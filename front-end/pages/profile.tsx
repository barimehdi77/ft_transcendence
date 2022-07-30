import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMedal,
	faUser,
	faTag,
	faCoins,
	faTableTennisPaddleBall,
	faCircleCheck,
	faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
	return (
		<main className='min-h-screen flex flex-col items-center justify-center'>
			<div className='profile drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
				<div className='header bg-sky-800 flex items-center px-10 py-4 rounded-t-3xl	'>
					<div className='header-info text-neutral-100'>
						<h2 className='text-xl font-semibold inline'>Abderr***</h2>
						<FontAwesomeIcon icon={faMedal} className='text-teal-500' />
						<p>asfaihi@student.1337.ma***</p>
					</div>
					<div className='avatar w-16'>
						<img
							src='/download.jpeg'
							alt='User avatar'
							className='rounded-full'
						/>
					</div>
				</div>

				<div className='main-info bg-white px-10 py-4 rounded-b-3xl'>
					<div className='item flex items-center'>
						<div className='bg-white w-8 h-8 flex items-center justify-center mr-3 rounded-full drop-shadow-[0_0px_4px_rgba(0,0,0,0.25)]'>
							<FontAwesomeIcon icon={faUser} />
						</div>
						<div className=''>
							<p className='text-sm text-neutral-500'>Full Name</p>
							<h2 className='font-semibold'>Abderrahmane Sfaihi***</h2>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Profile;
