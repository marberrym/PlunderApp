
const jwt = require('jsonwebtoken');
const express = require('express');
const ex = express();
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const cors = require('cors');
const dbq = require('./queries.js')
ex.use(express.static('../images'))

//Read body function for posts.
let readBody = (req, callback) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        callback(body);
    });
};

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

//Create a new post
let newPost = (req, res, name, item, category, description, price, userid) => {
    dbq.createPostcreatePost(name, item, category, description, price, userid)
}


//validation middlewhere takes in url query for ?token='webtoken'
let validateToken = (req, res, next) => {
    let token = req.query.token;
    let isValid = false;
    let payload;
    console.log(token);
    try {
        payload = jwt.verify(token, 'secretsig');
        isValid = true;
    } catch (err) {
        isValid = false;
    }
    req.user = payload;
    //creates a new property for the request object, called user
    if (isValid) {
        next();
    } else {
        res.end('youshallnotpass')
    }
}

let createToken = (req, res) => {
        let credentials = req.body;
        console.log(credentials)
        let validUser = dbq.usernameLogin(credentials.username, credentials.password);
        validUser.then(dbReply => {
            // this function serves an object with keys "username" and "password" from our form
            let loginID = JSON.stringify(dbReply.username);
            let loginPass = JSON.stringify(dbReply.password)
            let username = JSON.stringify(credentials.username);
            let password = JSON.stringify(credentials.password);
            if (loginID === username) {
                if (loginPass === password) {
                    let token = jwt.sign(
                        {userID: username},
                        'secretsig',
                        {expiresIn: '7d'}
                    );
                    res.end(token)
                    //this should be granted & held in localstorage for access later
                } else {
                    res.end('You entered an incorrect password, try again')
                }

            } else {
                res.end('You need to login, please enter username and password')
            }
        });
    ;
}


ex.use(jsonParser);
ex.post('/login', createToken);
// ex.get('/users', validateToken, getUsers);

ex.get('/users', getUsers);
ex.get('/posts', getPosts);
ex.get('/:username/posts', postsByUser);
ex.get('/:username/posts/:postid', postByUser);
ex.get('/posts/cat/:category', postsByCat);
ex.get('/posts/state/:location', postsByLocation);

ex.use(cors());
ex.listen(3000);





