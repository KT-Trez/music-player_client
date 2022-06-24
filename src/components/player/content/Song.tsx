//import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {Avatar, ListItemAvatar, ListItemButton, ListItemText} from '@mui/material';
import React from 'react';
import {Song as ISong} from '../../../types/interfaces';

interface SongProps {
	index: number;
	metadata: ISong;
	selectedIndex: number;
	selectIndex: Function;
	selectSong: Function;
}

function Song({index, metadata, selectedIndex, selectIndex, selectSong}: SongProps) {
	const setAsCurrentSong = () => {
		selectIndex(index);
		selectSong(metadata);
	};

	return (
		<ListItemButton onClick={setAsCurrentSong} selected={index === selectedIndex}>
			<ListItemAvatar>
				<Avatar alt={metadata.name} variant={'rounded'}/>
			</ListItemAvatar>
			<ListItemText primary={metadata.name} primaryTypographyProps={{noWrap: true}} secondary={metadata.size + 'MB'}/>
			{/*<ListItemIcon sx={{p: 0}}>*/}
			{/*	<PlayCircleIcon/>*/}
			{/*</ListItemIcon>*/}
		</ListItemButton>
	);
}

export default Song;