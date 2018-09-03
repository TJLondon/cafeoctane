import express from 'express';
import { ObjectId } from 'mongodb';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';
import Geo from 'geo-nearby';
import Geohash from 'ngeohash';
import bodyParser from "body-parser";

const router = express.Router();
let mdb;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(config.dbendpoint, function(err, db) {
    if (err) return console.log(err);
    assert.equal(null, err);
    console.log("Connected successfully to server");
    mdb = db;
});


router.get('/', (req, res) => {
    let options = {
        root: __dirname,
        dotfiles: 'allow',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    res.sendFile('readme.txt', options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:');
        }
    });
});

//converts latitude and longitude to geohash
router.get('/geo/encode', (req, res) => {
   // let lng = req.query.lng,
   //     lat = req.query.lat;
   //
   // if (!lng || !lat) {
   //     res.send('expecting lng lat');
   // }
   //
   // const ghash = Geohash.encode_int(lat, lng, null);
   // const response = {
   //     input : {
   //         lat: req.query.lat,
   //         lng: req.query.lng
   //     },
   //     output : {
   //         hash : ghash,
   //         lat : Geohash.decode_int(ghash).latitude.toString(),
   //         lng : Geohash.decode_int(ghash).longitude.toString()
   //     }
   // };
   // res.send(response);


   ///
    let octanedb = mdb.db('cafeoctane'),
        count = 0;
    try {
        octanedb.collection('events')
            .find()
            .sort({eventStart: 1})
            .each((err, event) => {
                assert.equal(null, err);

                if (!event) {
                    res.send('Updated ' + count + ' records');
                    return
                }

                if (event) {
                    if (event.lat && event.lng && event.g === '') {
                        let ghash = Geohash.encode_int(event.lat, event.lng, null);
                        octanedb.collection('events').update(
                            {_id: event._id},
                            {
                                $set:
                                    {
                                        g: ghash.toString(),
                                    }
                            }
                        )
                            .then(() => {
                                count = count + 1;
                            })
                            .catch((e) => {
                                res.send('error', e)
                            })
                    }
                }

            })
    }
    catch (e) {
        res.send(e);
    }

});

//serves up events based on radius from location
router.get('/events/geo/:limit/:page', (req, res) => {
    let octanedb = mdb.db('cafeoctane'),
        limit = req.params.limit,
        dateStart = req.query.dateStart,
        dateEnd = req.query.dateEnd,
        category = req.query.category,
        page = --req.params.page,

        hasDate = false,
        hasCateogry = false;

        dateStart && dateEnd ? hasDate = true : hasDate = false;
        category ? hasCateogry = true : hasCateogry = false;


    const loc = {
        lat: Number(req.query.lat),
        lng: Number(req.query.lng),
        radius: Number((req.query.radius*1000) * 1.60934) // miles to metres
    };

    let resultsArray = [],
        tempArray = [];

    if (!hasCateogry) {
        octanedb.collection('events').find({
                    eventStart: {
                            $gte: new Date(dateStart),
                            $lt: new Date(dateEnd)
                    }
        }).sort({eventStart: 1})
            .toArray((err,result) => {
                const geo = new Geo(result);
                tempArray.push(geo.nearBy(loc.lat,loc.lng,loc.radius));
                resultsArray.push(tempArray[0].slice(page * limit, (page + 1) * limit));
                resultsArray.push({ pages: Math.ceil((tempArray[0].length)  / limit), results: tempArray[0].length});
                res.send(resultsArray);
            })
    }
    else {
        octanedb.collection('eventType').findOne({eventTypeTitle: new RegExp(category.replace('-', ' '), "i")}, (err, eventType) => {
            octanedb.collection('events').find(
                {
                    eventCategory: { "$in" : [eventType._id]},
                    eventStart: {
                        $gte: new Date(dateStart),
                        $lt: new Date(dateEnd)
                    }
                }
                ).sort({eventStart: 1})
                .toArray((err,result) => {
                    const geo = new Geo(result);
                    tempArray.push(geo.nearBy(loc.lat,loc.lng,loc.radius));
                    resultsArray.push(tempArray[0].slice(page * limit, (page + 1) * limit));
                    resultsArray.push({ pages: Math.ceil((tempArray[0].length)  / limit), results: tempArray[0].length});
                    res.send(resultsArray);
                })
        });
    }
});

//Serves up trending events
router.get('/events/trending/:limit', (req, res) => {
    let events = {};
    let octanedb = mdb.db('cafeoctane');
    octanedb.collection('events')
        .find({
            trending: true,
            eventStart: {
                $gte: new Date()
            }
        })
        .sort({eventStart: 1})
        .limit(parseInt(req.params.limit))
        .each((err, event) => {
            assert.equal(null, err);
            if (!event) {
                res.send(events);
                return;
            }
            events[event._id] = event;
        });
});

//Serves up upcoming events
router.get('/events/upcoming/:limit', (req, res) => {
    let events = {};
    let octanedb = mdb.db('cafeoctane');
    octanedb.collection('events')
        .find({
            eventStart: {
                $gte: new Date()
            }})
        .sort({eventStart: 1})
        .limit(parseInt(req.params.limit))
        .each((err, event) => {
            assert.equal(null, err);
            if (!event) {
                res.send(events);
                return;
            }
            events[event._id] = event;
        });
});

//Serves up upcoming events
router.post('/events/history/:limit', (req, res) => {
    let ids = req.body.events.map(function (obj){ return ObjectId(obj)});
    let events = {};
    let octanedb = mdb.db('cafeoctane');
    octanedb.collection('events')
        .find(
            {
                _id: { $in: ids }
            }
        )
        .sort({eventStart: 1})
        .limit(parseInt(req.params.limit))
        .each((err, event) => {
            assert.equal(null, err);
            if (!event) {
                res.send(events);
                return;
            }
            events[event._id] = event;
        });
});


//Serves up all events
router.get('/events', (req, res) => {
    let events = {},
        octanedb = mdb.db('cafeoctane');
    octanedb.collection('events').find({}).sort({eventStart: 1})
        .each((err, event) => {
            assert.equal(null, err);
            if (!event) {
                res.send(events);
                return;
            }
            events[event._id] = event;
        })
});

router.get('/categories', (req, res) => {
    let categories = {},
        octanedb = mdb.db('cafeoctane');
    octanedb.collection('eventType').find({}).sort({eventTypeTitle: 1})
        .each((err, category) => {
            assert.equal(null, err);
            if (!category) {
                res.send(categories);
                return;
            }
            categories[category._id] = category;
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

//Organisers
router.get('/organisers/:organiserid', (req, res) => {
    let octanedb = mdb.db('cafeoctane');
    let oid = new ObjectId(req.params.organiserid);
    octanedb.collection('organisers')
        .findOne({ _id : oid }, (err, document) => {
                res.send(document);
            }
        )
});


export default router;