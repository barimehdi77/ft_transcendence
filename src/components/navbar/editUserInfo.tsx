import { useState } from 'react';
import Modal from '@mui/material/Modal';
import EditForm from './editForm';

const EditUserInfo = () => {
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	return (
		<>
			<button onClick={handleOpenModal}>Edit Profile</button>
			<Modal
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<>
					<EditForm handleCloseModal={handleCloseModal} />
				</>
			</Modal>
		</>
	);
};

export default EditUserInfo;
