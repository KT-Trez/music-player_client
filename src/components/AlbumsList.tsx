import {Album} from '../types/interfaces';
import {
	Avatar,
	Box,
	CircularProgress,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	ListSubheader
} from '@mui/material';
import React, {useEffect, useState} from 'react';


interface AlbumListProps {
	setSelectedAlbum: Function
}

export default function AlbumsList({setSelectedAlbum}: AlbumListProps) {
	const [albums, setAlbums] = useState([]);
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		const albumsURL = process.env.REACT_APP_ORIGIN_URL ? new URL( '/album/all', process.env.REACT_APP_ORIGIN_URL).toString() : '/album/all';
		fetch(albumsURL)
			.then(res => res.json())
			.then(albumsArr => {
				setAlbums(albumsArr);
				setIsFetching(false);
			})
			.catch(err => console.log(err));
	}, [isFetching]);

	return (
		<Box sx={{overflow: 'hidden'}}>
			<List>
				<ListSubheader component='div' id='nested-list-subheader'>
					Albumy
				</ListSubheader>

				{isFetching &&
                    <ListItem>
                        <CircularProgress/>
                    </ListItem>
				}

				{albums.map((albumData: Album, i: number) => {
					return (
						<React.Fragment key={i}>
							<ListItem disablePadding>
								<ListItemButton onClick={() => setSelectedAlbum(albumData)}>
									<ListItemAvatar>
										<Avatar alt={albumData.cover.name} src={process.env.REACT_APP_ORIGIN_URL ? new URL(albumData.cover.cdn, process.env.REACT_APP_ORIGIN_URL).toString() : albumData.cover.cdn} variant='square'/>
									</ListItemAvatar>
									<ListItemText primary={albumData.name} primaryTypographyProps={{noWrap: true}}/>
								</ListItemButton>
							</ListItem>
							<Divider/>
						</React.Fragment>
					);
				})}
			</List>
		</Box>
	);
}