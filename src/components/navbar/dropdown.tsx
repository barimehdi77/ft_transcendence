import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import UserImage from '../userImage';
import EditUserInfo from './editUserInfo';
import TwoFactorAuth from '../2FA/2FactorAuth';
import TurnOff2FA from '../2FA/turnOff2FA';
import Logout from './logout';

const Dropdown = () => {
	const { userInfo }: any = useContext(UserContext);

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
				<div className='text-white flex items-center hover:text-[#D3FAD6]'>
					<li className='lowercase text-xl font-semibold ml-10'>
						{userInfo.user_name}
					</li>
					<UserImage image_url={userInfo.image_url} />
				</div>
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
					{userInfo.isTwoFactorAuthenticationEnabled ? (
						<TurnOff2FA />
					) : (
						<TwoFactorAuth />
					)}
				</MenuItem>
				<MenuItem
					onKeyDown={(e) => e.stopPropagation()}
					onClick={handleCloseDropdown}
				>
					<Logout />
				</MenuItem>
			</Menu>
		</>
	);
};

export default Dropdown;
