import config from '../../config';
import { MongoClient } from 'mongodb';
import Q from 'q';

const mongodbUrl = config.dbendpoint;
exports.registeruser = (firstName, lastName, email, id, avatar, source, raw) => {
    const deferred = Q.defer();
    MongoClient.connect(mongodbUrl, function(err, db) {
        let mdb = db;
        let octanedb = mdb.db('cafeoctane');
        let collection = octanedb.collection('users');

        //check if email exists
        collection.findOne({'email' : email})
            .then(function (result) {
                if (null != result) {
                    console.log("USERNAME ALREADY EXISTS:", result.email);

                    //check if tokens match
                    if (id === result.token) {
                        db.close();
                        deferred.resolve(result); // username exists
                    }
                    else {
                        console.log('error', result);
                        deferred.resolve(false);
                    }
                }
                //If user doesn't exist, register them
                else {
                    let user = {
                        "first_name" : firstName,
                        "last_name" : lastName,
                        "email": email,
                        "token": id,
                        "avatar": avatar,
                        "source": source,
                        "optinSuggested": false,
                        "raw" : raw
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