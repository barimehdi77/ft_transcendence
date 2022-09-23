import { useState } from 'react';
import Modal from '@mui/material/Modal';

import MatchHistory from './matchHistory';

const MatchHistoryButton = ({ profileData }: any) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div className='flex justify-center items-center'>
			<button
				onClick={handleOpen}
				className='bg-sky-800 px-4 py-2 mb-2 text-white font-semibold rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-sky-700 hover:scale-105'
			>
				Match History
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<>
					<MatchHistory profileData={profileData} />
				</>
			</Modal>
		</div>
	);
};

export default MatchHistoryButton;
