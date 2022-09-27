import UserInputFrom from '../components/inputForm/userInputForm';
import Head from 'next/head';

const Setup = () => {
	return (
		<main className='min-h-screen flex flex-col justify-center'>
			<Head>
				<title>Setup</title>
			</Head>
			<h1 className='text-center text-5xl font-bold'>Setup your profile</h1>
			<UserInputFrom />
		</main>
	);
};

export default Setup;
