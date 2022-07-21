import ReactLoading from 'react-loading';
import LoadingDots from '../../components/loadingDots';
import styles from '../../styles/loading.module.css';
import { useRouter } from 'next/router';

const sendCode = async (code: any) => {
	const response = await fetch(`https://reqbin.com/echo/post/json`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(code),
	});
};

const Redirect = () => {
	const router = useRouter();
	const { code } = router.query;
	console.log(code);
	
	sendCode(code);
	return (
		<>
			<div className={styles.loading}>
				<LoadingDots type='balls' color='#196687' />
			</div>
		</>
	);
};

export default Redirect;
