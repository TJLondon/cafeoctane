import express from 'express';
import FacebookRoutes from './facebookStrategy';
import passport from "passport/lib/index";
import funct from '../users/functions';
import {MongoClient} from "mongodb";
import config from "../../config";
import cookieParser from 'cookie-parser';


const mongodbUrl = config.mLabendpoint;

const FacebookRouter = express.Router();

FacebookRouter.use(passport.initialize());
FacebookRouter.use(passport.session());
FacebookRouter.use(cookieParser("secret"));

FacebookRouter.get('/login/facebook', FacebookRoutes.authenticate());
FacebookRouter.get('/facebook/callback', FacebookRoutes.callback());

//Get current user data
FacebookRouter.get('/user',(req, res) => {
    //Set them both to int to avoid undefined strings
    let user = Number(req.user) || Number(req.signedCookies['usertoken']);

    if (!req.cookies.usertoken && req.user) {
        let options = {
            maxAge: 7776000000, // would expire after 15 minutes
            httpOnly: true, // The cookie only accessible by the web server
            signed: true // Indicates if the cookie should be signed
        };
        res.cookie('usertoken', req.user, options); // options is optional
    }


    MongoClient.connect(mongodbUrl, function (err, db) {
        let octanedb = db.db('cafeoctane');
        let collection = octanedb.collection('users');
        //check if username is already assigned in our database
        collection.findOne({'token': user.toString()})
            .then(function (user) {
                if (null != user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(200).json('{"error": "unable to authenticate against local DB"}');
                }
            });
    });
});
export default FacebookRouter;