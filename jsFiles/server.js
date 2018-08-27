let users = [
    {id: '1', name: 'Jaydoe', email: 'jayjay@jay.com', pw: 'shimmy'},
    {id: '2', name: 'XXXTentacion', email:'sonotdead@hiphop.com', pw: 'dondon'}
]


const express = require('express');
let ex = express();

ex.listen(3000);

let getUsers = (req, res) => {
    res.end(users[0].name);
}


ex.get('/users', getUsers);
// ex.get('/flutters', allFlutters);
// ex.get('/users/:username/flutters', fluttersByUser);
// ex.get('/users/:username/:postid', specificUserPost)