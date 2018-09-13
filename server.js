import config from './config';
import express from 'express';
import apiRouter from './api';
import React from "react";
import { renderToString } from "react-dom/server";
import FacebookRouter from './auth/social/FacebookRouter';
import GoogleRouter from './auth/social/GoogleRouter';
import UserRouter from './auth/users/UserRouter';
import LocationRouter from './api/locationService';
import Home from './src/js/home/Home';
import EventDetails from './src/js/searchresults/EventDetails';
import session from 'express-session';
import { StaticRouter } from "react-router-dom";
import SitemapRouter from './sitemap';

const server = express();
var compression = require('compression');

server.set('view engine', 'ejs');
server.use(session({secret: "secret"}));
if (config.host !== '0.0.0.0') {
    server.get('*.js', function (req, res, next) {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        next();
    });
}




function HTMLTemplate(reactDom) {
    return `<!DOCTYPE html><html lang="en"><head> <title>Cafe Octane - UK Car Events Near You</title> <meta charset="UTF-8"> <meta name="description" content="Search for epic car shows, vehicle meets, track days and motorsport events throughout the UK and continental Europe"> <meta name="keywords" content="car shows, cars and coffee, supercar, meets, meetings, automotive, classic cars, fast cars, sports cars, car competition, drag racing, belnheim palace, goodwood festival, Essex, Kent, Sussex, Suffolk, Norfolk, Yorkshire, Cornwall, Dorset, London"> <meta name="author" content="Tom Jordan"> <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0"> <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet"> <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> <link rel="stylesheet" href="/assets/vendor/bootstrap/bootstrap-3-3-7.min.css"> <link rel="icon" type="image/x-icon" href="/assets/img/favicon.ico"/> <link rel="stylesheet" href="/main.css"></head><body><div id="app">${reactDom}</div></body><script src="/bundle.js" type="text/javascript"></script><script async src="https://www.googletagmanager.com/gtag/js?id=UA-125110099-1"></script><script>window.dataLayer=window.dataLayer || []; function gtag(){dataLayer.push(arguments);}gtag('js', new Date()); gtag('config', 'UA-125110099-1');</script></body></html>`
}

server.get([
    '/'
], (req,res) => {
    const context = { };
    const jsx = ( <StaticRouter context={ context } location={ req.url }>
        <Home />
    </StaticRouter> );
    const reactDom = renderToString(jsx);
    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( HTMLTemplate( reactDom ) );
});

server.get([
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
    const context = { };
    const jsx = ( <StaticRouter context={ context } location={ req.url }>
        <EventDetails />
    </StaticRouter> );
    const reactDom = renderToString(jsx);
    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( HTMLTemplate( reactDom ) );
});

//api
server.use('/api', apiRouter); //events api
server.use('/auth/facebook', FacebookRouter); //user authentication
server.use('/auth/google', GoogleRouter); //user authentication
server.use('/user', UserRouter); //user actions
server.use('/api/location', LocationRouter); //LocationRouter actions
server.use('/sitemap', SitemapRouter);

//compress static
server.use(compression());
server.use(express.static('public'));
server.use('/assets', express.static(__dirname + '/assets'));

server.listen(config.port, config.host, () => {
    console.info('Express is listening on port' + config.port);
});