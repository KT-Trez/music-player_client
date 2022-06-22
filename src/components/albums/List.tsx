import {Stack} from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Album as IAlbum} from '../../types/interfaces';
import Album from './Album';


function List() {
	const [albums, setAlbums] = useState<IAlbum[]>([]);

	const getAlbums = async () => {
		try {
			const albumsArr = await axios({
				method: 'get',
				responseType: 'json',
				url: '/albums/all'
			});
			setAlbums(albumsArr.data);
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		getAlbums();
	}, []);

	return (
		<React.Fragment>
			<Stack gap={1} sx={{p: 2}}>
				{albums.map(album => {
					return (<Album key={album.id} metadata={album}/>)
				})}
			</Stack>
		</React.Fragment>
	);
}

export default List;