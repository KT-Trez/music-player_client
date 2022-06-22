import {TableCell, TableRow} from '@mui/material';
import React from 'react';
import {Song} from '../../../types/interfaces';


interface PreviewItemProps {
	metadata: Song
}

function PreviewItem({metadata}: PreviewItemProps) {
	return (
		<TableRow>
			<TableCell>{metadata.name}</TableCell>
			<TableCell>{metadata.size} MB</TableCell>
			<TableCell>{metadata.id}</TableCell>
		</TableRow>
	);
}

export default PreviewItem;