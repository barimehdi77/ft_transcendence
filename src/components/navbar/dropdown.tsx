import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { useState } from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import UserImage from '../userImage';

const Dropdown = () => {
	const { userInfo } = useContext(UserContext);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (e: any) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				id='basic-button'
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<li className='flex items-center lowercase text-white text-xl font-semibold ml-12 hover:text-[#D3FAD6]'>
					{userInfo.user_name}
				</li>
				<UserImage />
			</Button>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={handleClose}>
					<Link href='/profile'>View My Profile</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>Edit Profile</MenuItem>
				<MenuItem onClick={handleClose}>2 Factor-Auth</MenuItem>
				<MenuItem onClick={handleClose}>Logout</MenuItem>
			</Menu>
		</>
	);
};

export default Dropdown;
