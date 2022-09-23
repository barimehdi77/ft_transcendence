import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTableTennisPaddleBall,
	faCommentDots,
	faDisplay,
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
	return (
		<main className='min-h-screen flex flex-col items-center justify-center'>
			<button className='bg-sky-800 text-7xl text-white uppercase font-bold rounded-full py-10 px-20 mt-10 mb-10 hover:bg-sky-700 hover:scale-105'>
				<FontAwesomeIcon icon={faTableTennisPaddleBall} className='mr-5' />
				<Link href='/game'>play</Link>
			</button>
			<button className='bg-sky-800 text-5xl text-white uppercase font-semibold rounded-full py-6 px-16  mb-10 hover:bg-sky-700 hover:scale-105'>
				<FontAwesomeIcon icon={faDisplay} className='mr-5' />
				<Link href='/spectate'>Spectate</Link>
			</button>
			<button className='bg-sky-800 text-5xl text-white uppercase font-semibold rounded-full py-6 px-16 hover:bg-sky-700 hover:scale-105'>
				<FontAwesomeIcon icon={faCommentDots} className='mr-5' />
				<Link href='/chat'>chat</Link>
			</button>
		</main>
	);
};

export default Home;
