import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {Grid, IconButton, Slider, Stack} from '@mui/material';
import React from 'react';

interface VolumeProps {
	setVolume: Function;
	volume: number;
}

function Volume({setVolume, volume}: VolumeProps) {
	const maxVolume = () => {
		setVolume(1);
	};

	const minVolume = () => {
	  setVolume(0);
	};

	return (
		<Grid container item sx={{pb: 1}} xs={12}>
			<Grid item xs/>

			<Grid item xs={10} md={4}>
				<Stack alignItems={'center'} direction={'row'} gap={2}>
					<IconButton onClick={minVolume}>
						<VolumeOffIcon color={'disabled'}/>
					</IconButton>
					<Slider onChange={(event, value) => setVolume(value)} max={1} min={0} step={0.01} value={volume}/>
					<IconButton onClick={maxVolume}>
						<VolumeUpIcon color={'disabled'}/>
					</IconButton>
				</Stack>
			</Grid>

			<Grid item xs/>
		</Grid>
	);
}

export default Volume;