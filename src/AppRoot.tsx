import {CssBaseline} from '@mui/material';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import List from './components/albums/List';
import Header from './components/header/Header';
import Player from './components/player/Player';


function AppRoot() {
	return (
		<React.Fragment>
			<Header/>

			<BrowserRouter>
				<Routes>
					<Route element={<List/>} path={'/'}/>
					<Route element={<Player/>} path={'/player/:albumID'}/>
				</Routes>
			</BrowserRouter>

			<CssBaseline/>
        </React.Fragment>
	);
}

export default AppRoot;