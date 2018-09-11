import express from 'express';
import sm from 'sitemap'
import config from "./config";
import {MongoClient} from "mongodb";
import assert from 'assert';

const SitemapRouter = express.Router();
const sitemap = sm.createSitemap({
    hostname: 'https://www.cafeoctane.com',
    cacheTime: 300000 ,
    urls: [
        { url: '/events/find/cars-and-coffee', changefreq: 'daily', priority: 0.3 },
        { url: '/events/find/motorsport', changefreq: 'monthly',  priority: 0.7 },
        { url: '/events/find/car-shows', changefreq: 'monthly',  priority: 0.7 },
        { url: '/events/find/supercar-meets', changefreq: 'monthly',  priority: 0.9 },
        { url: '/events/find/american',  changefreq: 'monthly', priority: 0.3 },
        { url: '/events/find/japanese-and-imports',  changefreq: 'monthly', priority: 0.3 },
        { url: '/events/find/track-days',  changefreq: 'monthly', priority: 0.9 }
    ]}
);

SitemapRouter.get('/', (req,res) => {
        MongoClient.connect(config.dbendpoint, function(err, db) {
            if (err) return console.log(err);
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const mdb = db;
            const octanedb = mdb.db('cafeoctane');
            octanedb.collection('events').find({}, (err, data) => {
                data.forEach((doc) => {
                    sitemap.add( {
                            url: '/event/' + doc.eventTitle.replace(/\s+/g, '-').toLowerCase()+ '/' + doc._id ,
                            changefreq: 'weekly'
                        }
                    );
                })
                    .then((doc) => {
                        res.set({
                            'Content-Type': 'text/xml'
                        });
                        res.send(sitemap.toString());
                    });
            })
        });
    }
);
export default SitemapRouter