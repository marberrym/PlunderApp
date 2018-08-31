let priv = require('./private');

var googleMapsClient = require('@google/maps').createClient({
    key: priv.apiKey,
    Promise: Promise
});

let geocode = (city, state) => {
    return googleMapsClient.geocode({
        address: city + ', ' + state
        }).asPromise()
}


exports.geocode = geocode;