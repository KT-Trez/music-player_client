import {Grid, Slider, Stack, Typography} from '@mui/material';
import React from 'react';
import useTimestamp from '../../hooks/useTimestamp';


interface ProgressProps {
	current: number | undefined;
	duration: number | undefined;
}

function Progress({current, duration}: ProgressProps) {
	const currentTimestamp = useTimestamp(current ? Math.round(current) : 0);
	const durationTimestamp = useTimestamp(duration ? Math.floor(duration) : 0);

	return (
		<Grid item sx={{p: 1}} xs={12}>
			<Stack alignItems={'center'} direction={'row'} gap={2}>
				<Typography variant={'body2'}>
					{current ? currentTimestamp : '00:00'}
				</Typography>
				<Slider max={duration ?? 0} min={0} size={'small'} value={current ?? 0}/>
				<Typography variant={'body2'}>
					{duration ? durationTimestamp : '00:00'}
				</Typography>
			</Stack>
		</Grid>
	);
}

export default Progress;