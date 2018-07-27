import express from 'express';
import FacebookRoutes from './facebookStrategy';
import passport from "passport/lib/index";
import funct from '../users/functions';
import {MongoClient} from "mongodb";
import config from "../../config";


const mongodbUrl = config.mLabendpoint;

const FacebookRouter = express.Router();

FacebookRouter.use(passport.initialize());
FacebookRouter.use(passport.session());

FacebookRouter.get('/login/facebook', FacebookRoutes.authenticate());
FacebookRouter.get('/facebook/callback', FacebookRoutes.callback(function(user) {
    res.send(user);
}));

//Get current user data
FacebookRouter.get('/user',(req, res) => {
    MongoClient.connect(mongodbUrl, function (err, db) {
        let mdb = db;
        let octanedb = mdb.db('cafeoctane');
        let collection = octanedb.collection('users');
        //check if username is already assigned in our database
        collection.findOne({'token': req.user})
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