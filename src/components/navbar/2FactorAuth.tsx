import { useState } from 'react';
import Modal from '@mui/material/Modal';
import TwoFactorAuthModal from './2FAModal';

const TwoFactorAuth = () => {
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	return (
		<>
			<button onClick={handleOpenModal}>2-Factor-Auth</button>
			<Modal
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<>
					<TwoFactorAuthModal handleCloseModal={handleCloseModal} />
				</>
			</Modal>
		</>
	);
};

export default TwoFactorAuth;
