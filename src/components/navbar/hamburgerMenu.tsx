import { useState } from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const HamburgerMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const openDropdown = Boolean(anchorEl);
	const handleClick = (e: any) => {
		setAnchorEl(e.currentTarget);
	};
	const handleCloseDropdown = () => {
		setAnchorEl(null);
	};

	return (
		<div className='navbar:hidden'>
			<Button
				id='basic-button'
				aria-controls={openDropdown ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={openDropdown ? 'true' : undefined}
				onClick={handleClick}
			>
				<FontAwesomeIcon icon={faBars} className='text-white text-3xl' />
			</Button>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				open={openDropdown}
				onClose={handleCloseDropdown}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<Link href='/'>
					<MenuItem
						onKeyDown={(e) => e.stopPropagation()}
						onClick={handleCloseDropdown}
					>
						Home
					</MenuItem>
				</Link>
				<Link href='/game'>
					<MenuItem
						onKeyDown={(e) => e.stopPropagation()}
						onClick={handleCloseDropdown}
					>
						Play
					</MenuItem>
				</Link>
				<Link href='/chat'>
					<MenuItem
						onKeyDown={(e) => e.stopPropagation()}
						onClick={handleCloseDropdown}
					>
						Chat
					</MenuItem>
				</Link>
				<Link href='/friends'>
					<MenuItem
						onKeyDown={(e) => e.stopPropagation()}
						onClick={handleCloseDropdown}
					>
						Friends
					</MenuItem>
				</Link>
			</Menu>
		</div>
	);
};

export default HamburgerMenu;
