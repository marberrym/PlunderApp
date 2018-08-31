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

let mapQuery = (object) => {
    let location = object.json.results[0].geometry.location
    console.log(location)
}

exports.mapQuery = mapQuery;
exports.geocode = geocode;