import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {Box, Grid, IconButton, Paper, Skeleton, Stack, Typography} from '@mui/material';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Album as IAlbum} from '../../types/interfaces';
import Preview from './content/Preview';


interface AlbumProps {
	metadata: IAlbum;
}

function Album({metadata}: AlbumProps) {
	const navigate = useNavigate();

	const [coverBlobURL, setCoverBlobURL] = useState<string | undefined>(undefined);
	const [coverLoading, setCoverLoading] = useState(true);

	const [previewOpen, setPreviewOpen] = useState(false);

	const convertToMB = (bytes: number) => {
		return Math.round(bytes / 1024 / 1024 * 100) / 100;
	};

	const openPlayer = () => {
	  navigate('/player/' + metadata.id);
	};

	const togglePreview = () => {
		setPreviewOpen(value => !value);
	};

	const getCover = useCallback(async () => {
		try {
			const cover = await axios({
				method: 'get',
				responseType: 'blob',
				url: metadata.cover.cdn
			});
			setCoverBlobURL(URL.createObjectURL(cover.data));
		} catch (err) {
			console.error(err);
		}
		setCoverLoading(false);
	}, [metadata.cover.cdn]);

	useEffect(() => {
		getCover();
	}, [getCover]);

	return (
		<Paper>
			<Grid container gap={1}>
				<Box component={Grid} display={{md: 'block', xs: 'none'}} item md={'auto'}>
					{coverLoading ?
						<Skeleton height={150} variant={'rectangular'} width={150}/>
						:
						<img alt={metadata.cover.name}
							 src={metadata.cover.hasCover ? coverBlobURL : 'https://placehold.jp/c0c0c0/ffffff/150x150.png?text=unavailable'}
							 style={{height: 150, width: 150}}/>
					}
				</Box>

				<Grid container gap={1} item sx={{p: 2}} xs>
					{/* todo: add responsive font size */}
					<Grid item xs>
						<Typography variant={'h4'}>
							{metadata.name}
						</Typography>
						<Typography variant={'caption'}>
							{metadata.id}
						</Typography>
					</Grid>
					<Grid item xs={'auto'}>
						<Typography variant={'subtitle2'}>
							{convertToMB(metadata.size)} MB
						</Typography>
						<Stack direction={'row'} justifyContent={'flex-end'}>
							<IconButton color={'primary'} edge={'end'} onClick={openPlayer} size={'large'}>
								<PlayCircleIcon/>
							</IconButton>
							<IconButton color={'primary'} edge={'end'} onClick={togglePreview} size={'large'}>
								<ExpandCircleDownIcon sx={{transform: previewOpen ? 'rotate(180deg)' : '', transition: '250ms'}}/>
							</IconButton>
						</Stack>
					</Grid>
				</Grid>
			</Grid>
			<Preview albumID={metadata.id} isOpen={previewOpen}/>
		</Paper>
	);
}

export default Album;