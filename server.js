import config from './config';
import express from 'express';
import apiRouter from './api';
import FacebookRouter from './auth/social/FacebookRouter';
import UserRouter from './auth/users/UserRouter';
import session from 'express-session';

const server = express();

server.set('view engine', 'ejs');

// import serverRender from './serverRender';

server.get([
    '/',
    '/events',
    '/event/:title/:id',
    '/events/find/:category',
    '/register',
    '/profile',
    '/about'
], (req,res) => {
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

server.use(express.static('public'));
server.use("/assets", express.static(__dirname + '/assets'));
server.use(session({secret: "secret"}));
//api
server.use('/api', apiRouter); //events api
server.use('/auth', FacebookRouter); //user authentication
server.use('/user', UserRouter); //user actions


server.listen(config.port, config.host, () => {
    console.info('Express is listening on port' + config.port);
});