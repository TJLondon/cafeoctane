import express from 'express';
import sm from 'sitemap'
import request from 'request';

const SitemapRouter = express.Router();

const sitemap = sm.createSitemap({
    hostname: 'https://www.cafeoctane.com',
    cacheTime: 600000 });



SitemapRouter.get('/', (req,res) => {

        request.get(
            {uri: 'http://localhost:8080/api/events'}, (req,res) => {
            console.log(res);
            console.log(req);
        });


        sitemap.add( {
                url: '/page-1/'
            }
        );

        res.set({
            'Content-Type': 'text/xml'
        });

    res.send(sitemap.toString());
    }
    );

export default SitemapRouter