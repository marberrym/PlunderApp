const jwt = require('jsonwebtoken');
const express = require('express');
let ex = express();
ex.listen(3000);

let users = [
    {id: '1', name: 'Jaydoe', email: 'jayjay@jay.com', pw: 'shimmy'},
    {id: '2', name: 'XXXTentacion', email:'sonotdead@hiphop.com', pw: 'dondon'}
]

let readBody = (req, callback) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        callback(body);
    });
};



let getUsers = (req, res) => {
    res.end(users[0].name);
}

let validateToken = (req, res, next) => {
    let token = req.query.token;
    let isValid = false;
    let payload;
    try {
        payload = jwt.verify(token, 'signature');
        isValid = true;
    } catch (err) {
        isValid = false;
    }
    console.log(payload.userID);
    req.user = payload;
    //creates a new property for the request object, called user
    if (isValid) {
        next();
    } else {
        res.end('youshallnotpass')
    }
}

let createToken = (req, res) => {
    readBody(req, body => {
        let credentials = JSON.parse(body);
        if (credentials.firstName === 'marshall' && credentials.lastName === 'simpson') {
            
            let token = jwt.sign(
                {userID: '56878'},
                'backendssignatureyo',
            {expiresIn: '7d'}
            );
            res.end(token)
            //frontend needs localstorage to hold this
            //grant passprot
        } else {
            res.end('your shits expired')
        }
    })
}

ex.get('/users', validateToken, getUsers);
ex.post('/token', createToken);

//?=username=nybblr&password=1234
//middleware req,res,next


// authenticate = (req, res, next) => {
//     if (req.query.username === && req.query.password ===){
//         next();
//     } else {
//         res.end('not tooday!')
//     }
// }



// post to tokens, because it's to create a new thing
//npm install --save jjsonwebtoken

//username/id stored in webtoken
//password
//username can be reused so we use userID, don't want the token to 
//be replicant
// 