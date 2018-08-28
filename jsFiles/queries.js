const pg = require('pg-promise')();
const db = pg('postgres://marshallsimpson@localhost:5432/plunder')

let listAllUsers = () => {
    return db.query(`select * from users`)
}

let listAllPosts = () => {
    return db.query(`select * from posts`)
}

let allPostsByUser = (username) => {
    return db.query(`select username, name, item, description
        FROM posts
        INNER JOIN users ON users.id = posts.userid
        WHERE username = '` + username + `'`);
}

let onePostsByUser = (username, postid) => {
    return db.one(`select username, name, item, description
        FROM posts
        INNER JOIN users ON users.id = posts.userid
        WHERE username = '` + username + `'
        AND postid = '` + postid + `'`);
}

let listPostsByCategory = (category) => {
    return db.query(`select * 
        FROM posts
        WHERE category = '` + category + `'`);
}

let listPostsByState = (state) => {
    return db.query(`select username, state, name, item, price, description
        FROM posts 
        INNER JOIN users ON users.id = posts.userid
        WHERE state = '` + state + `'`);
}

let createPost = (name, item, category, description, price, userid) => {
    return db.one(`INSERT INTO posts (name, item, category, description, price, userid) values 
        ('` + name + `', '` + item + `', '` + category + `', '` + description + `', ` + price + `, '` + userid + `');`);
}


exports.listAllUsers = listAllUsers;
exports.listAllPosts = listAllPosts;
exports.allPostsByUser = allPostsByUser;
exports.onePostsByUser = onePostsByUser;
exports.listPostsByCategory = listPostsByCategory;
exports.listPostsByState = listPostsByState;
exports.createPost = createPost;


