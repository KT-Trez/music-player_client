import {Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {Song} from '../../../types/interfaces';
import PreviewItem from './PreviewItem';

interface PreviewProps {
	albumID: string;
	isOpen: boolean;
}

function Preview({albumID, isOpen}: PreviewProps) {
	const [songs, setSongs] = useState<Song[]>([]);

	const getContent = useCallback(async () => {
		try {
			const contentArr = await axios({
				method: 'get',
				responseType: 'json',
				url: '/albums/' + albumID
			});
			setSongs(contentArr.data);
		} catch (err) {
			console.error(err);
		}
	}, [albumID]);

	useEffect(() => {
		getContent();
	}, [getContent]);

	return (
		<Collapse in={isOpen} unmountOnExit>
			<TableContainer sx={{maxHeight: '50vh'}}>
				<Table size={'small'} stickyHeader>
					<caption>Songs</caption>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Size</TableCell>
							<TableCell>ID</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{songs.map(song => {
							return(<PreviewItem key={song.id} metadata={song}/>)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Collapse>
	);
}

export default Preview;