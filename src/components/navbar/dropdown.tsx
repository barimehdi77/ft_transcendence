import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { useState } from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import UserImage from '../userImage';
import EditUserInfo from './editUserInfo';
import TwoFactorAuth from '../2FA/2FactorAuth';

const Dropdown = () => {
	const { userInfo } = useContext(UserContext);

	const [anchorEl, setAnchorEl] = useState(null);
	const openDropdown = Boolean(anchorEl);
	const handleClick = (e: any) => {
		setAnchorEl(e.currentTarget);
	};
	const handleCloseDropdown = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				id='basic-button'
				aria-controls={openDropdown ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={openDropdown ? 'true' : undefined}
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
				open={openDropdown}
				onClose={handleCloseDropdown}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem
					onKeyDown={(e) => e.stopPropagation()}
					onClick={handleCloseDropdown}
				>
					<Link href='/profile'>View Profile</Link>
				</MenuItem>
				<MenuItem onKeyDown={(e) => e.stopPropagation()}>
					<EditUserInfo />
				</MenuItem>
				<MenuItem onKeyDown={(e) => e.stopPropagation()}>
					<TwoFactorAuth />
				</MenuItem>
				<MenuItem
					onKeyDown={(e) => e.stopPropagation()}
					onClick={handleCloseDropdown}
				>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
};

export default Dropdown;
