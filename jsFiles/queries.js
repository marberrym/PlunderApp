const pg = require('pg-promise')();
const db = pg('postgres://wills@localhost:5432/plunder')


let listAllUsers = () => {
    return db.query(`select * from users;`)
}

let listAllPosts = () => {
    return db.query(`select * from posts;`)
}

let usernameLogin = (username, password) => {
    return db.one(`select username, password, id
    FROM users
    WHERE username = '` + username + `'
    AND password = '` + password + `';`
    );
}

let allPostsByUser = (username) => {
    return db.query(`select usr.username, pst.name, pst.item, pst.description
        FROM posts pst
        INNER JOIN users usr ON usr.id = pst.userid
        WHERE username = '` + username + `';`);
}

let onePostsByUser = (username, postid) => {
    return db.one(`select usr.username, pst.name, pst.item, pst.description, pst.price, usr.city, usr.state
        FROM posts pst
        INNER JOIN users usr ON usr.id = pst.userid
        WHERE username = '` + username + `'
        AND pst.id = '` + postid + `';`);
}

let listPostsByCategory = (category) => {
    return db.query(`select * 
        FROM posts
        WHERE category = '` + category + `';`);
}

let listPostsByState = (state) => {
    return db.query(`select usr.username, usr.state, usr.city, pst.name, pst.item, pst.price, pst.description
        FROM posts pst
        INNER JOIN users usr ON usr.id = pst.userid
        WHERE usr.state = '` + state + `';`);
}

let createPost = (name, item, category, description, price, userid) => {
    return db.one(`INSERT INTO posts (name, item, category, description, price, userid) values 
        ('` + name + `', '` + item + `', '` + category + `', '` + description + `', ` + price + `, '` + userid + `');`);
}

exports.usernameLogin = usernameLogin;
exports.listAllUsers = listAllUsers;
exports.listAllPosts = listAllPosts;
exports.allPostsByUser = allPostsByUser;
exports.onePostsByUser = onePostsByUser;
exports.listPostsByCategory = listPostsByCategory;
exports.listPostsByState = listPostsByState;
exports.createPost = createPost;


