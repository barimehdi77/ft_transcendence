import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTableTennisPaddleBall,
	faCommentDots,
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
	return (
		<main className='min-h-screen flex flex-col items-center justify-center'>
			<button className='bg-sky-800 text-7xl text-white uppercase font-bold rounded-full py-10 px-20 mb-10 hover:bg-sky-700 hover:scale-105'>
				<FontAwesomeIcon icon={faTableTennisPaddleBall} className='mr-5' />
				<a href='/play'>play</a>
			</button>
			<button className='bg-sky-800 text-5xl text-white uppercase font-semibold rounded-full py-6 px-16 hover:bg-sky-700 hover:scale-105'>
				<FontAwesomeIcon icon={faCommentDots} className='mr-5' />
				<a href='/chat'>chat</a>
			</button>
		</main>
	);
};

export default Home;
