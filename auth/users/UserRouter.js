import express from 'express';
import {MongoClient} from "mongodb";
import config from "../../config";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from "passport/lib/index";

const mongodbUrl = config.dbendpoint,
    userRouter = express.Router();

userRouter.use(cookieParser("secret"));
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));
userRouter.use(passport.initialize());
userRouter.use(passport.session());
//Get current user data


userRouter.get('/signout', (req,res) => {
    res.clearCookie("usertoken");
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

userRouter.post('/update', (req,res) => {
    let user = Number(req.user) || Number(req.signedCookies['usertoken']);
    MongoClient.connect(mongodbUrl, function (err, db) {
        let octanedb = db.db('cafeoctane');
        let collection = octanedb.collection('users');
        collection.update(
            { token: user.toString() },
            {
                $set: {
                    "first_name": req.body.first_name,
                    "last_name": req.body.last_name,
                    "email": req.body.email,
                    "optinSuggested": req.body.optinSuggested
                }
            }
        )
            .then(()=> {
                res.status(200).json('{"success"}');
            })
    });
});

userRouter.post('/bookmark/add', (req,res) => {
    let user = Number(req.user) || Number(req.signedCookies['usertoken']);
    MongoClient.connect(mongodbUrl, function (err, db) {
        let octanedb = db.db('cafeoctane');
        let collection = octanedb.collection('bookmarks');
        collection.update(
            { user_token: user.toString() },
            {
                $addToSet: {
                    "bookmarks": req.body.eventid
                }
            },
            { upsert: true }
        )
            .then(()=> {
                res.status(200).json('{"success"}');
            })
    });
});

userRouter.post('/bookmark/remove', (req,res) => {
    let user = Number(req.user) || Number(req.signedCookies['usertoken']);
    MongoClient.connect(mongodbUrl, function (err, db) {
        let octanedb = db.db('cafeoctane');
        let collection = octanedb.collection('bookmarks');
        collection.update(
            { user_token: user.toString() },
            {
                $set: {
                    "bookmarks": req.body.bookmarks
                }
            }
        )
            .then(()=> {
                res.status(200).json('{"success"}');
            })
    });
});



userRouter.get('/bookmarks', (req,res) => {
    let user = Number(req.user) || Number(req.signedCookies['usertoken']);

    MongoClient.connect(mongodbUrl, function (err, db) {
        let octanedb = db.db('cafeoctane');
        let collection = octanedb.collection('bookmarks');
        collection.findOne({'user_token': user.toString()})
            .then(function (bookmarks) {
                if (null != bookmarks) {
                    res.status(200).json(bookmarks);
                }
                else {
                    res.status(200).json('{"error": "unable to authenticate against local DB"}');
                }
            });
    });
});

export default  userRouter