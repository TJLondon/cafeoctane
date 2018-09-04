import express from 'express';
const LocationRouter = express.Router();
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCBQPdAc6XhD7cHv_HKopDeT1tMdJhAaCM'
});

LocationRouter.get('/autocomplete', (req, res) => {
    let components = {country: 'uk' },
        input =  req.query.input;
    googleMapsClient.placesAutoComplete({
        input: input,
        components: components,
        sessiontoken: req.sessionID
    }, function(err, response) {
        if (!err) {
            res.send(response.json.predictions);
        }
    });
});

LocationRouter.get('/geo', (req, res) => {
   let address = req.query.address;
    googleMapsClient.geocode({
        address: address
    }, function(err, response) {
        if (!err) {
            res.send(response.json.results);
        }
    });
});

LocationRouter.get('/geo/reverse', (req, res) => {
    let lng = req.query.lng,
        lat = req.query.lat;
    googleMapsClient.reverseGeocode({
        latlng: [lat,lng]
    }, function(err, response) {
        if (!err) {
            res.send(response.json.results);
        }
    });
});


export default LocationRouter