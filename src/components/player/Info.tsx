import {Grid, Stack, Typography} from '@mui/material';
import React from 'react';
import {Album, Song} from '../../types/interfaces';


interface InfoProps {
	metadata: Album | undefined;
	song: Song | undefined;
}

function Info({metadata, song}: InfoProps) {
	return (
		<Grid container item xs={12}>
			<Grid item xs={'auto'}>
				<img alt={'album img'}
					 src={'https://placehold.jp/c0c0c0/ffffff/250x250.png?text=unavailable'}
					 style={{height: 150, width: 150}}/>
			</Grid>
			<Grid item sx={{p: 1}} xs>
				<Stack direction={'row'} justifyContent={'space-between'}>
					<Typography sx={{fontStyle: song?.author ? '' : 'italic'}} variant={'caption'}>
						{song ? song?.author?.name ?? 'author unknown' : ''}
					</Typography>
					<Typography variant={'caption'}>
						{Math.round((metadata?.size ?? 0)/ 1024 / 1024 * 100) / 100} MB
					</Typography>
				</Stack>
				<Typography variant={'h4'}>
					{metadata?.name}
				</Typography>
				<Typography sx={{fontStyle: song ? '' : 'italic'}} variant={'subtitle1'}>
					{song?.name ?? 'no selected song'}
				</Typography>
			</Grid>
		</Grid>
	);
}

export default Info;