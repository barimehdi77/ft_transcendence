import axios from 'axios';
import { useEffect, useState } from 'react';
import { getQRCode } from './getQRCode';
import { sendPassCode } from './sendPassCode';

const TwoFactorAuthModal = ({ handleCloseModal }: any) => {
	const [qrCode, setQrCode]: any = useState();
	const [passcode, setPasscode] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		async function getQRCodeData() {
			const data = await getQRCode();
			setQrCode(data);
		}
		getQRCodeData();
	}, []);

	async function sendCode() {
		try {
			const res = await sendPassCode(passcode);
			if (res.data.status === 'success') handleCloseModal();
		} catch (error: any) {
			console.log(error);
			setErrorMessage(error.response.data.message);
		}
	}

	return (
		<section className='m-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
			<div className='drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mt-20'>
				<div className='bg-sky-800 px-10 py-4 rounded-t-3xl	'>
					<h2 className='text-2xl text-white text-center font-semibold capitalize'>
						two factor auth setup
					</h2>
				</div>
				<div className='bg-white px-10 py-4 rounded-b-3xl flex flex-col'>
					{qrCode ? (
						<img src={URL.createObjectURL(qrCode)} alt='QR Code' />
					) : null}
					<input
						placeholder='Verification code'
						type='text'
						className='bg-gray-100 px-4 py-2 my-2 rounded-full border border-slate-300'
						onChange={(e) => {
							setPasscode(e.target.value);
						}}
					/>
					<button
						onClick={sendCode}
						className='bg-sky-800 px-6 py-2 w-min my-3 m-auto text-l text-white font-semibold capitalize rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-sky-700 hover:scale-105'
					>
						submit
					</button>
					{errorMessage ? (
						<p className='bg-red-200 text-red-700 py-2 rounded-full pl-4 border border-red-700'>
							{errorMessage}
						</p>
					) : null}
				</div>
			</div>
		</section>
	);
};

export default TwoFactorAuthModal;
