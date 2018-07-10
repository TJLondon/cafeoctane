import React from 'react';
import ReactDOMServer from 'react-dom/server';
import SearchResults from './src/js/pages/SearchResults';

import axios from 'axios';
import config from './config';

axios.get(`${config.serverUrl}/api/events`)
.then(resp => {
    ReactDOMServer.renderToString(<SearchResults />)
})