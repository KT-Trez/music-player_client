import {Grid, List, Typography} from '@mui/material';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {Song as ISong} from '../../../types/interfaces';
import Song from './Song';


interface SongsProps {
	albumID: string | undefined;
	selectSong: Function;
}

function Songs({albumID, selectSong}: SongsProps) {
	const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
	const [songs, setSongs] = useState<ISong[]>([]);

	const getSongs = useCallback(async () => {
		try {
			const songsArr = await axios({
				method: 'get',
				responseType: 'json',
				url: '/albums/content/' + albumID
			});
			setSongs(songsArr.data);
		} catch (err) {
			console.error(err);
		}
	}, [albumID]);

	useEffect(() => {
		getSongs();
	}, [getSongs]);

	return (
		<Grid item sx={{p: 1}} xs={12}>

			{songs.length > 0 ?
				<List sx={{maxHeight: '48vh', overflow: 'auto'}}>
					{songs.map((song, index) => {
						return (<Song index={index}
									  key={song.id}
									  metadata={song}
									  selectedIndex={selectedIndex ?? -1}
									  selectIndex={setSelectedIndex}
									  selectSong={selectSong}/>);
					})}
				</List>
				:
				<Typography color={'text.secondary'} variant={'caption'}>
					There are no songs in this album.
				</Typography>
			}

		</Grid>
	);
}

export default Songs;