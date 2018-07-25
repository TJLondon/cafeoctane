import express from 'express';
import { ObjectId } from 'mongodb';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';
import Geo from 'geo-nearby';
import Geohash from 'ngeohash';

const router = express.Router();
let mdb;

MongoClient.connect(config.mLabendpoint, function(err, db) {
    if (err) return console.log(err);
    assert.equal(null, err);
    console.log("Connected successfully to server");
    mdb = db;
});


//converts latitude and longitude to geohash
router.get('/geo/encode', (req, res) => {
   let lng = req.query.lng,
       lat = req.query.lat;

   if (!lng || !lat) {
       res.send('expecting lng lat');
   }

   const ghash = Geohash.encode_int(lat, lng, null);
   const response = {
       input : {
           lat: req.query.lat,
           lng: req.query.lng
       },
       output : {
           hash : ghash,
           lat : Geohash.decode_int(ghash).latitude.toString(),
           lng : Geohash.decode_int(ghash).longitude.toString()
       }
   };

   res.send(response);
});

//serves up events based on radius from location
router.get('/events/geo', (req, res) => {
    let octanedb = mdb.db('cafeoctane');

    const loc = {
        lat: Number(req.query.lat),
        lng: Number(req.query.lng),
        radius: Number((req.query.radius*1000) * 1.60934) // miles to metres
    };
    console.log(loc);
    octanedb.collection('events').find({})
        .toArray((err,result) => {
            const geo = new Geo(result);
            res.send(geo.nearBy(loc.lat,
                                loc.lng,
                                loc.radius));
        })
});

//Serves up all events
router.get('/events', (req, res) => {
    let events = {};
    let octanedb = mdb.db('cafeoctane');
    octanedb.collection('events').find({})
        .each((err, event) => {
            assert.equal(null, err);
            if (!event) {
                res.send(events);
                return;
            }
            events[event._id] = event;
        })
});

//Serves event details by event ID
router.get('/events/:eventid', (req, res) => {
    let octanedb = mdb.db('cafeoctane');
    let oid = new ObjectId(req.params.eventid);
    octanedb.collection('events')
        .findOne({ _id : oid }, (err, document) => {
            res.send(document);
            }
        )

});

export default router;