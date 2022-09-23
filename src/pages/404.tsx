import Head from "next/head";

const NotFound = () => {
	return (
		<main className='min-h-screen flex flex-col justify-center items-center'>
			<Head>
				<title>404: Page does not exist</title>
			</Head>
			<h1 className='text-sky-800 font-extrabold text-9xl mb-4'>404</h1>
			<h2 className='font-bold text-4xl'>Page does not exist</h2>
		</main>
	);
}

export default NotFound;