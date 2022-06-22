import SettingsIcon from '@mui/icons-material/Settings';
import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';
import React from 'react';


function Header() {
	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography component={'div'} sx={{flexGrow: 1}} variant={'h6'}>
					Music Player
				</Typography>

				<IconButton color='inherit'	size={'large'}>
					<SettingsIcon/>
				</IconButton>
				{/* todo: settings page */}
			</Toolbar>
		</AppBar>
);
}

export default Header;