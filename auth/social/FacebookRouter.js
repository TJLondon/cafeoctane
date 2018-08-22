import express from 'express';
import FacebookRoutes from './facebookStrategy';
import passport from "passport/lib/index";
import {MongoClient} from "mongodb";
import config from "../../config";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const mongodbUrl = config.dbendpoint,
      FacebookRouter = express.Router();

FacebookRouter.use(passport.initialize());
FacebookRouter.use(passport.session());
FacebookRouter.use(cookieParser("secret"));
FacebookRouter.use(bodyParser.json());
FacebookRouter.use(bodyParser.urlencoded({ extended: true }));

FacebookRouter.get('/login/facebook', FacebookRoutes.authenticate());
FacebookRouter.get('/facebook/callback', FacebookRoutes.callback());

FacebookRouter.get('/verified',(req, res) => {
    if (!req.cookies.usertoken && req.user) {
        let options = {
            maxAge: 7776000000, // 90 day expiry
            httpOnly: false,
            signed: true
        };
        MongoClient.connect(mongodbUrl, function (err, db) {
            let octanedb = db.db('cafeoctane');
            let usersCollection = octanedb.collection('users');
            //check if username is already assigned in our database
            usersCollection.findOne(
                {'token': req.user.toString()})
                .then(function (user) {
                    if (null != user) {
                        res.cookie('usertoken', req.user, options);
                        res.cookie('avatar', user.avatar, {maxAge:7776000000, httpOnly: false});
                        res.redirect('/');
                    }
                    else {
                        res.status(200).json('{"error": "unable to authenticate against local DB"}');
                        res.redirect('/register');
                    }
                });
        });




    }

})


FacebookRouter.get('/user',(req, res) => {
    //Set them both to int to avoid undefined strings
    let user = Number(req.user) || Number(req.signedCookies['usertoken']);
    if (!req.cookies.usertoken && req.user) {
        let options = {
            maxAge: 7776000000, // 90 day expiry
            httpOnly: false,
            signed: true
        };

        res.cookie('usertoken', req.user, options);
    }


    MongoClient.connect(mongodbUrl, function (err, db) {
        let octanedb = db.db('cafeoctane');
        let userObj = [];
        let usersCollection = octanedb.collection('users');
        let bookmarksCollection = octanedb.collection('bookmarks');
        //check if username is already assigned in our database
        usersCollection.findOne(
            {'token': user.toString()})
            .then(function (user) {
                if (null != user) {
                    userObj.push(user);
                    bookmarksCollection.findOne({'user_token': user.token.toString()})
                        .then (function (bookmarks) {
                            userObj.push(bookmarks.bookmarks);
                            res.status(200).json(userObj);
                        })
                        .catch(error => {
                            res.status(200).json(userObj)
                        })
                }
                else {
                    res.status(200).json('{"error": "unable to authenticate against local DB"}');
                }
            });
    });
});

export default FacebookRouter;