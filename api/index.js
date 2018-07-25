import express from 'express';
import { ObjectId } from 'mongodb';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';

const router = express.Router();
let mdb;

MongoClient.connect(config.dbendpoint, function(err, db) {
    if (err) return console.log(err);
    assert.equal(null, err);
    console.log("Connected successfully to server");
    mdb = db;
});


router.get('/events', (req, res) => {
    let events = {};
    let octanedb = mdb.db('cafeoctane');
    octanedb.collection('events').find({})
        .each((err, event) => {
            assert.equal(null, err);
            if (!event) {
                res.send(events);
                return ;
            }
            events[event.id] = event;
        })
});

router.get('/events/:eventid', (req, res) => {
    let octanedb = mdb.db('cafeoctane');
    let oid = new ObjectId(req.params.eventid);
    octanedb.collection('events')
        .findOne({ _id : oid }, (err, document) => {
            console.log(document);
            res.send(document)
            }
        )

});

export default router;