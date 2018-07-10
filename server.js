import config from './config';
import express from 'express';
import apiRouter from './api';

const server = express();

server.set('view engine', 'ejs');

import './serverRender';

server.get(['/', '/events', '/events/:id'], (req,res) => {
    //serverRender();
    res.render('index', {
        content: 'my string'
    });
})

server.use('/api', apiRouter);
server.use(express.static('public'));


server.listen(config.port, config.host, () => {
    console.info('Express is listening on port' + config.port);
});