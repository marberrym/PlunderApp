
const jwt = require('jsonwebtoken');
const express = require('express');
const ex = express();
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const cors = require('cors');
const dbq = require('./queries.js');
const maps = require('./maps');
const priv = require('./private');
ex.use(cors());
ex.use('/images/', express.static('./images'));
ex.use(express.static('./frontend'));
ex.use(jsonParser);
let multer = require('multer');
let upload = multer({dest: './images'});
 
ex.post("/postimageupload", upload.single('post-image'), (req, res)  =>  {
    let postid = req.body.id;
    console.log(postid)
    dbq.postAddImage(postid, './images/' + req.file.filename)
    .then(row => {
        res.send(row)
    })
})

ex.post("/registerimageupload", upload.single('profile-image'), (req, res)  =>  {
    let userid = req.body.id;
    console.log(userid)
    dbq.registerAddImage(userid, './images/' + req.file.filename)
    .then(row => {
        res.send(row)
    })
})
//Request All Users
let getUsers = (req, res) => {
    dbq.listAllUsers()
        .then(results => res.send(results));
}

//Get posts - page initialization
let getPosts = (req, res) => {
    dbq.listAllPosts()
        .then(results => res.send(results));
}

//Get posts by specific user
let postsByUser = (req, res) => {
    let user = req.params.username;
    dbq.allPostsByUser(user)
        .then(results => res.send(results));
}

//Get specific post by specific user
let postByUser = (req, res) => {
    let user = req.params.username;
    let post = req.params.postid;
    dbq.onePostsByUser(user, post)
        .then(results => res.send(results));
}

//Get posts by category
let postsByCat = (req, res) => {
    let category = req.params.category;
    console.log(category);
    dbq.listPostsByCategory(category)
        .then(results => res.send(results));
}

//Get Posts by Location
let postsByLocation = (req, res) => {
    let state = req.params.location;
    dbq.listPostsByState(state)
        .then(results => res.send(results));
}

let newUser = (req, res, next) => {
    let userForm = req.body;
    console.log(userForm);
    dbq.createUser(userForm)
        .then(results => {
            res.send(results)
        });
}

//Create a new post
let newPost = (req, res) => {
    let postForm = req.body;  
    console.log(postForm);              
    dbq.createPost(postForm)
        .then(results => {
            res.send(results)
        });
}

//validation middlewhere takes in url query for ?token='webtoken'
let validateToken = (req, res) => {
    let responseObject = {response: null,
                            payload: null}
    let token = req.body.webtoken
    let testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIifQ.XSnJHmO0Z55qeh-bZM7nsvTGAIETHmkdhdkvKyNS5po'
    let isValid;
    let payload;
    try {
        console.log("I'm testing.")
        console.log(token);
        let decoded = jwt.verify(token, priv.signature, {"alg": "HS256", "typ": "JWT"});
        console.log(decoded);
        isValid = true;
        req.user = decoded.payload;
        responseObject.payload = payload;
    } catch (err) {
        console.log(err)
        console.log("Token not valid.");
        isValid = false;
    }
    //creates a new property for the request object, called user
    if (isValid) {
        responseObject.response = "Logged in";
        res.send(responseObject);
    } else {
        responseObject.response = "invalid login";
        res.send(responseObject);
    }
}

let createToken = (req, res) => {
    let credentials = req.body;
    let password = credentials.password;
    let id = credentials.id;
    let username = credentials.username;
    console.log(credentials);

    dbq.usernameLogin(username, password)
        .then(results => {
            if (results.password === password && results.username === username) {
                let token = jwt.sign(
                    {name: results.username,
                    userid: results.id},
                    priv.signature,
                    {expiresIn: '7d'})
                    res.end(JSON.stringify(token));
            } else {
                res.end("Sorry, invalid login");
            }
        }).catch(error=> console.debug(error));
    };

//geocoding
let getGeocode = (req, res) => {
    maps.geocode(req.body.city, req.body.state)
        .then(results => {
            maps.mapQuery(results)
            .then(results => {
                res.send(results.json.results);
            })
        })
}

ex.post('/checktoken', validateToken);
ex.post('/login', createToken);
ex.post('/register', newUser, createToken);
ex.post('/post', newPost);
ex.post('/newpost', newPost);
ex.post('/map', getGeocode);
ex.get('/users', getUsers);
ex.get('/posts', getPosts);
ex.get('/:username/posts', postsByUser);
ex.get('/:username/posts/:postid', postByUser);
ex.get('/posts/cat/:category', postsByCat);
ex.get('/posts/state/:location', postsByLocation);

ex.listen(3000);





