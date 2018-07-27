import config from '../../config';
import { MongoClient } from 'mongodb';
import Q from 'q';


// MongoDB connection information
const mongodbUrl = config.mLabendpoint;

//used in Facebook Signup strategy
//profile._json.email, profile._json.id
exports.facebookReg = (profile) => {
    const deferred = Q.defer();
    MongoClient.connect(mongodbUrl, function(err, db) {
        let mdb = db;
        let octanedb = mdb.db('cafeoctane');
        let collection = octanedb.collection('users');

        //check if email exists
        collection.findOne({'email' : profile.email})
            .then(function (result) {
                if (null != result) {
                    console.log("USERNAME ALREADY EXISTS:", result.email);

                    //check if tokens match
                    if (profile.id === result.token) {
                        db.close();
                        deferred.resolve(profile); // username exists
                    }
                    else {
                        console.log('error', result);
                        deferred.resolve(false);
                    }
                }
                //If user doesn't exist, register them
                else {
                    let user = {
                        "email": profile.email,
                        "token": profile.id,
                        "avatar": profile.picture.data.url
                        //"avatar":profile.avatar
                    };

                    console.log("CREATING USER:", profile.email);

                    collection.insert(user)
                        .then(function () {
                            db.close();
                            deferred.resolve(profile);
                        });
                }
            });
    });
    return deferred.promise;
};