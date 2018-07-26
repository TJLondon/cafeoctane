import config from '../../config';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import Q from 'q';


// MongoDB connection information
const mongodbUrl = config.mLabendpoint;

//used in local-signup strategy
exports.localReg = (email, hash) => {
    const deferred = Q.defer();

    MongoClient.connect(mongodbUrl, function(err, db) {
        let mdb = db;
        let octanedb = mdb.db('cafeoctane');
        let collection = octanedb.collection('users');
        //check if username is already assigned in our database
        collection.findOne({'email' : email})
            .then(function (result) {
                if (null != result) {
                    console.log("USERNAME ALREADY EXISTS:", result.username);
                    deferred.resolve(true); // username exists
                }
                else  {
                    let user = {
                        "email": email,
                        "token": hash,
                        "avatar": "http://placepuppy.it/images/homepage/Beagle_puppy_6_weeks.JPG"
                    };

                    console.log("CREATING USER:", email);

                    collection.insert(user)
                        .then(function () {
                            db.close();
                            deferred.resolve(user);
                        });
                }
            });
    });

    return deferred.promise;
};


//check if user exists
//if user exists check if passwords match (use bcrypt.compareSync(password, hash); // true where 'hash' is password in DB)
//if password matches take into website
//if user doesn't exist or password doesn't match tell them it failed
exports.localAuth = function (email, hash) {
    const deferred = Q.defer();

    MongoClient.connect(mongodbUrl, function (err, db) {
        let mdb = db;
        let octanedb = mdb.db('cafeoctane');
        octanedb.collection('users').findOne({'email' : email})
            .then(function (result) {
                if (null == result) {
                    console.log("USERNAME NOT FOUND:", email);

                    deferred.resolve(false);
                }
                else {
                    const token = result.token;

                    console.log("FOUND USER: " + result.email);

                    if (token === hash) {
                        deferred.resolve(result);
                    } else {
                        console.log("AUTHENTICATION FAILED");
                        deferred.resolve(false);
                    }
                }

                db.close();
            });
    });

    return deferred.promise;
};