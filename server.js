import config from './config';
import express from 'express';
import apiRouter from './api';
import FacebookRouter from './auth/social/FacebookRouter';
import GoogleRouter from './auth/social/GoogleRouter';
import UserRouter from './auth/users/UserRouter';
import LocationRouter from './api/locationService';
import session from 'express-session';

const server = express();

server.set('view engine', 'ejs');

// import serverRender from './serverRender';

if (config.host !== '0.0.0.0') {
server.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});
}

server.get([
    '/',
    '/events',
    '/event/:title/:id',
    '/events/find/:category',
    '/register',
    '/profile',
    '/bookmarks',
    '/about',
    '/terms',
    '/privacy'
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
server.use('/auth/facebook', FacebookRouter); //user authentication
server.use('/auth/google', GoogleRouter); //user authentication
server.use('/user', UserRouter); //user actions
server.use('/api/location', LocationRouter); //LocationRouter actions


server.listen(config.port, config.host, () => {
    console.info('Express is listening on port' + config.port);
});