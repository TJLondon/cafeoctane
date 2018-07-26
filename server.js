import config from './config';
import express from 'express';
import apiRouter from './api';
import FacebookRouter from './auth/social/FacebookRouter';

const server = express();

server.set('view engine', 'ejs');

// import serverRender from './serverRender';

server.get(['/', '/events', '/events/:id'], (req,res) => {
    // serverRender()
    //     .then(content => {
    //         res.render('index', {
    //             content
    //         });
    //     })
    //     .catch(console.error)

    res.render('index', {
        content: ''
    });

});

server.use('/api', apiRouter);
server.use('/auth', FacebookRouter);
server.use(express.static('public'));
server.use(express.static('assets'));


server.listen(config.port, config.host, () => {
    console.info('Express is listening on port' + config.port);
});