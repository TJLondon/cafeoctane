import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Home from './src/js/pages/Home';


import axios from 'axios';
import config from './config';


// const serverRender = () =>
//     axios.get(`${config.serverUrl}/api/events`)
//         .then(resp => {
//             return (
//             ReactDOMServer.renderToString(<Home />)
//         )
//         })
//
// export default serverRender;