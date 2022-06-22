import axios from 'axios';
import AppRoot from './AppRoot';
import React from 'react';
import ReactDOM from 'react-dom';


axios.defaults.baseURL = process.env.REACT_APP_SERVER_ORIGIN ?? undefined;

ReactDOM.render(
  <React.StrictMode>
    <AppRoot/>
  </React.StrictMode>,
  document.getElementById('root')
);