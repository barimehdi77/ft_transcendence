import Link from 'next/link';
import Head from 'next/head';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTableTennisPaddleBall,
	faCommentDots,
	faDisplay,
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
	return (
		<main
			className='h-screen flex flex-col items-center justify-center'
			style={{ minHeight: '620px' }}
		>
			<Head>
				<title>Home</title>
			</Head>
			<Link href='/game'>
				<button className='bg-sky-800 text-7xl text-white uppercase font-bold rounded-full py-8 px-20 my-4 hover:bg-sky-700 hover:scale-105'>
					<FontAwesomeIcon icon={faTableTennisPaddleBall} className='mr-5' />
					play
				</button>
			</Link>
			<Link href='/spectate'>
				<button className='bg-sky-800 text-5xl text-white uppercase font-semibold rounded-full py-6 px-16 my-4 hover:bg-sky-700 hover:scale-105'>
					<FontAwesomeIcon icon={faDisplay} className='mr-5' />
					spectate
				</button>
			</Link>
			<Link href='/chat'>
				<button className='bg-sky-800 text-5xl text-white uppercase font-semibold rounded-full py-6 px-16 my-4 hover:bg-sky-700 hover:scale-105'>
					<FontAwesomeIcon icon={faCommentDots} className='mr-5' />
					chat
				</button>
			</Link>
		</main>
	);
};

export default Home;
