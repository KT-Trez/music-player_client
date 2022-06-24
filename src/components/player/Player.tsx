import {Divider, Grid, Paper} from '@mui/material';
import axios from 'axios';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Album, Song} from '../../types/interfaces';
import Controls from './Controls';
import Info from './Info';
import Progress from './Progress';
import Songs from './content/Songs';
import Volume from './Volume';


function Player() {
	const audio = useMemo(() => new Audio(), []);
	const {albumID} = useParams();

	const [album, setAlbum] = useState<Album | undefined>(undefined);

	const [currentSong, setCurrentSong] = useState<Song | undefined>(undefined);
	const [playerCurrentTime, setPlayerCurrentTime] = useState<number | undefined>(undefined);
	const [playerDuration, setPlayerDuration] = useState<number | undefined>(undefined);
	const [playerPaused, setPlayerPaused] = useState(false);
	const [playerVolume, setPlayerVolume] = useState(audio.volume);

	const getAlbum = useCallback( async () => {
		try {
			const albumInfo = await axios({
				method: 'get',
				responseType: 'json',
				url: '/albums/' + albumID
			});
			setAlbum(albumInfo.data);
		} catch (err) {
			console.error(err);
		}
	}, [albumID]);
	
	const getSong = useCallback( async () => {
		if (!currentSong)
			return;
		
		try {
			const audioResource = await axios({
				method: 'get',
				responseType: 'blob',
				url: currentSong?.cdn ?? ''
			});

			audio.src = URL.createObjectURL(audioResource.data);
			await audio.play();
			setPlayerDuration(audio.duration);
		} catch (err) {
			console.error(err);
		}
	}, [audio, currentSong]);

	const updateCurrentTime = useCallback(() => {
	  setPlayerCurrentTime(audio.currentTime);
	}, [audio.currentTime]);

	useEffect(() => {
		getAlbum();
	}, [getAlbum]);

	useEffect(() => {
		getSong();
	}, [getSong]);

	useEffect(() => {
		audio.volume = playerVolume;
	}, [audio, playerVolume]);

	useEffect(() => {
		if (!currentSong)
			return;

		if (playerPaused)
			audio.pause();
		else
			audio.play();
	}, [audio, currentSong, playerPaused]);

	useEffect(() => {
		audio.addEventListener('timeupdate', updateCurrentTime);
		return () => {
			audio.removeEventListener('timeupdate', updateCurrentTime);
		};
	}, [audio, updateCurrentTime]);

	return (
		<Paper sx={{m: 1}}>
			<Grid container>
				<Info metadata={album} song={currentSong}/>
				<Progress current={playerCurrentTime} duration={playerDuration}/>
				<Controls isPaused={playerPaused} setIsPaused={setPlayerPaused}/>
				<Volume setVolume={setPlayerVolume} volume={playerVolume}/>
				<Grid item xs={12}>
					<Divider/>
				</Grid>
				<Songs albumID={albumID} selectSong={setCurrentSong}/>
			</Grid>
		</Paper>
	);
}

export default Player;