import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import {Grid, IconButton, Stack} from '@mui/material';
import React from 'react';


interface ControlsProps {
	isPaused: boolean;
	setIsPaused: Function;
}

function Controls({isPaused, setIsPaused}: ControlsProps) {
	return (
		<Grid item xs={12}>
			<Stack alignItems={'center'} direction={'row'} justifyContent={'center'}>
				<IconButton>
					<SkipPreviousIcon fontSize={'large'}/>
				</IconButton>
				<IconButton>
					<ArrowLeftIcon fontSize={'large'}/>
				</IconButton>
				<IconButton onClick={() => setIsPaused(!isPaused)} size={'large'}>
					{isPaused ?
						<PlayArrowIcon fontSize={'large'}/>
						:
						<PauseIcon fontSize={'large'}/>
					}
				</IconButton>
				<IconButton>
					<ArrowRightIcon fontSize={'large'}/>
				</IconButton>
				<IconButton>
					<SkipNextIcon fontSize={'large'}/>
				</IconButton>
			</Stack>
		</Grid>
	);
}

export default Controls;