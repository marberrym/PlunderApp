#  Plunder 
#### An app creating an on-line marketplace for users that places a high value on the safety of users while they conduct their e-commerce transactions.

**Table of Contents:**
* <a href="#core-features">**Core Features**</a>
* <a href="#personal-responsibilities">**Personal Responsibilities**</a>
* <a href="#challenges">**Challenges**</a>

<div align="center">
<img src="markdownimages/PlunderMain.png" height="500px">
</div>

When developing the concept behind plunder, I thought about the endless possibilities that a service like Craigslist offers paired with my hesitance to utilize them.  I choose not to frequent Craigslist because I have heard too many stories about purchase arrangements leading to less than shady transactions.  I wanted to offer a similar service that placed a higher emphasis on providing safe places for the e-commerce transactions to take place.

#### This was a group project developed by:
* Matthew Marberry (myself)
* Marshall Simpson

## Core Features:

##### A persistent database that allows users to register and login to the Plunder server and upload a user icon image.

<div align="center">
<img src="/markdownimages/PlunderLogin.png" height="300px">
</div>

##### Post expansion where users can see more about the post, if they are interested they can open a map of suggested plunder spots based on the location of the post.

<div align="center">
<img src="/markdownimages/PlunderPost.png" height="200px">
<img src="/markdownimages/PlunderMap.png" height="200px">
</div>

##### Users can filter posts based on the state and category of posts.

<div align="center">
<img src="/markdownimages/PlunderCats.png" height="300px">
</div>

##### Users can register and if they are logged in they can submit posts with images as well as contact any other plunder posters via email.

<div align="center">
<img src="/markdownimages/PlunderEmail.png" height="200px">
<img src="/markdownimages/PlunderSubmit.png" height="200px">
</div>




## Personal Responsibilities:

In this project I had a wide array of responsibilities including but not limited to:
##### Concept Development
##### Design Oversight:
* Logo Development
* Design of front-end interface
##### Google Maps API integration
* Creating geocodes
* Querying a list of results based on location
* Front-end placement of the map
##### JSON Webtokens
* Encryption and storing of user data
* Back-end verification of webtokens
##### Backend Server Router Patterns
* Developing RESTful requests used to receive data from out server


## Challenges:

Throughout this project both Marshall and I ran into several challenges and hurdles, but we were able to work together to overcome these issues.  I'm going to speak about some of my personal struggles in regards to developing the Plunder App.

My two main struggles in developing this project were in regards to:
1. Google Maps Back End Integration.
2. JSON Webtokens for user database.

#### Google Maps Integration:

The most difficult aspect of the Google Maps Integration was getting the front and back end to work together properly.  This required Google Maps API access on both the front end the server side.  The front end dealt with rendering the map and the locations based on the information that was retrieved server side.  The server side would be taking in the city and state of the selected post, converting that to geocode and then populating a list of destinations near that geocode and handing it back to the front end.  Here is some sample code:

###### This is my code that would handle the RESTful post request to the /map URL.
```javascript
let getGeocode = (req, res) => {
    maps.geocode(req.body.city, req.body.state)
        .then(results => {
            maps.mapQuery(results)
            .then(results => {
                res.send(results.json.results);
            })
        })
}

ex.post('/map', getGeocode);
```

###### This is where my back end server talks to the Google Maps API and returns me a geocode which is used to get a list of locations (in this example firehouses) that are within a given radius of the post location.

```javascript
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
    let longlat = object.json.results[0].geometry.location
    return googleMapsClient.placesNearby({location: longlat,
                                radius: 12000.3,
                                keyword: 'Fire Department'
                                }).asPromise();
}
exports.mapQuery = mapQuery;
exports.geocode = geocode;
```

While this code may not look super complicated - it did take quite a bit of trial and error to get right.  I then passed this information back to the front end where the map was populated.

#### JSON Webtokens

In this project I used JSON webtokens to encrypt user information which was stored in local storage and send that information to my backend server.  Once the token was received by the backend - it was decrypted and verified with a database query.  The entire process took some trial and error, but after a day of hard work I had a good understanding of the JSON Webtoken concept.  

Here are some code snippets from my JSON process:

###### This is where I stored and sent the JSON webtokens to the backend.

```javascript
let myStorage = window.localStorage;
//WE WILL BE STORING A WEBTOKEN.
let checkLogin = () => {
    fetch('http://localhost:3000/checktoken', {
        method: 'POST',
        body: JSON.stringify(myStorage),
        headers: {'Content-Type': 'application/json'}
    })
    .then(result => {
        return result.json()})   
        .then(status => {
        if (status.response === 'Logged in'){
            registerBTN.classList.add('hide');
            loginBTN.classList.add('hide');
            postBTN.classList.remove('hide');
            logoutBTN.classList.remove('hide');
            loggedin = true;
        } else {
            registerBTN.classList.remove('hide');
            loginBTN.classList.remove('hide');
            postBTN.classList.add('hide');
            logoutBTN.classList.add('hide');
            loggedin = false;
        }
    })
}
checkLogin();
```

This code would verify whether or not the user was validly logged in then it would dictate what options are shown on the page based on the login status.

###### This is where I would create the webtoken for a new user.  Existing users would have their webtoken verified.

Creation:

```javascript
let createToken = (req, res) => {
    let credentials = req.body;
    let password = credentials.password;
    let id = credentials.id;
    let username = credentials.username;
    console.log(credentials);

    dbq.usernameLogin(username, password)
        .then(results => {
            console.log(results);
            if (results.password === password && results.username === username) {
                console.log("im here");
                let token = jwt.sign(
                    {name: results.username,
                    userid: results.id},
                    priv.signature,
                    {expiresIn: '7d'})
                    console.log(token);
                    res.end(JSON.stringify(token));
            } else {
                res.end("Sorry, invalid login");
            }
        }).catch(error=> res.send({response: "bad login"}));
    };
```

Validation:

```javascript
let validateToken = (req, res) => {
    let responseObject = {response: null,
                            payload: null}
    let token = req.body.webtoken
    let isValid;
    let payload;
    try {
        let decoded = jwt.verify(token, priv.signature, {"alg": "HS256", "typ": "JWT"});
        isValid = true;
        req.user = decoded.payload;
        responseObject.payload = payload;
    } catch (err) {
        isValid = false;
    }
    //creates a new property for the request object, called user
    if (isValid) {
        responseObject.response = "Logged in";
        res.send(responseObject);
    } else {
        responseObject.response = "Invalid login";
        res.send(responseObject);
    }
}
```

The concept of JWT was a difficult one to break into.  Learning how to utilize JWT was a great experince for me though, it tought me the importance of combing through documentation for any NPM I need to use without prior experience.

### Conclusion:

In the end I was very happy with our MVP (minimum viable product), I feel that Plunder may have a spot in my future development and I aim to have a more polished version deployed in the near future.

