const pg = require('pg-promise')();
const priv = require('./private');
const db = pg(priv.dbLocation);


let listAllUsers = () => {
    return db.query(`select * from users;`)
}

let listAllPosts = () => {
    return db.query(`select usr.username, usr.userimg, pst.item, usr.city, pst.price, usr.state, pst.description, pst.descripimg 
                    FROM posts pst
                    INNER JOIN users usr ON usr.id = pst.userid`)
}

let usernameLogin = (username, password) => {
    return db.one(`select username, password, id
    FROM users
    WHERE username = '` + username + `'
    AND password = '` + password + `';`
    );
}

let allPostsByUser = (username) => {
    return db.query(`select usr.username, usr.userimg, pst.item, pst.description, pst.descripimg
        FROM posts pst
        INNER JOIN users usr ON usr.id = pst.userid
        WHERE username = '` + username + `';`);
}

let onePostsByUser = (username, postid) => {
    return db.one(`select usr.username, usr.userimg, pst.item, pst.description, pst.descripimg, pst.price, usr.city, usr.state
        FROM posts pst
        INNER JOIN users usr ON usr.id = pst.userid
        WHERE username = '` + username + `'
        AND pst.id = '` + postid + `';`);
}

let listPostsByCategory = (category) => {
    return db.query(`select usr.username, usr.userimg, pst.item, usr.city, pst.price, usr.state, pst.description, pst.descripimg
        FROM posts pst
        INNER JOIN users usr ON usr.id = pst.userid
        WHERE category = '` + category + `';`);
}

let listPostsByState = (state) => {
    return db.query(`select usr.username, usr.userimg, usr.state, usr.city, pst.item, pst.price, pst.description, pst.descripimg
        FROM posts pst
        INNER JOIN users usr ON usr.id = pst.userid
        WHERE usr.state = '` + state + `';`);
}

let createPost = (item, category, description, descripimg, price, userid) => {
    return db.one(`INSERT INTO posts (item, category, description, price, userid) values 
        ('` + item + `', '` + category + `', '` + description + `', '` + descripimg + `', '` + price + `', '` + userid + `');`);
}


exports.usernameLogin = usernameLogin;
//let createUser = (username, password, email, first, last, city, state, )
exports.listAllUsers = listAllUsers;
exports.listAllPosts = listAllPosts;
exports.allPostsByUser = allPostsByUser;
exports.onePostsByUser = onePostsByUser;
exports.listPostsByCategory = listPostsByCategory;
exports.listPostsByState = listPostsByState;
exports.createPost = createPost;


