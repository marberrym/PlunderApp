const pg = require('pg-promise')();
const priv = require('./private');
const db = pg(priv.dbLocation);


let listAllUsers = () => {
    return db.query(`select * from users;`)
}

let listAllPosts = () => {
    return db.query(`select usr.username, usr.userimg, pst.item, usr.city, pst.price, usr.state, pst.description, pst.descripimg, usr.email 
                    FROM posts pst
                    LEFT JOIN users usr ON usr.id = pst.userid`)
}

let usernameLogin = (username, password) => {
    return db.one(`select username, password, id
    FROM users
    WHERE username = '` + username + `'
    AND password = '` + password + `';`)
}

let allPostsByUser = (username) => {
    return db.query(`select usr.username, usr.userimg, pst.item, pst.description, pst.descripimg, usr.email
        FROM posts pst
        INNER JOIN users usr ON usr.id = pst.userid
        WHERE username = '` + username + `';`);
}

let onePostsByUser = (username, postid) => {
    return db.one(`select usr.username, usr.userimg, pst.item, pst.description, pst.descripimg, pst.price, usr.city, usr.state, usr.email
        FROM posts pst
        INNER JOIN users usr ON usr.id = pst.userid
        WHERE username = '` + username + `'
        AND pst.id = '` + postid + `';`);
}

let listPostsByCategory = (category) => {
    return db.query(`select usr.username, usr.userimg, pst.item, usr.city, pst.price, usr.state, pst.description, pst.descripimg, usr.email
        FROM posts pst
        INNER JOIN users usr ON usr.id = pst.userid
        WHERE category = '` + category + `';`);
}

let checkUser = (username) => {
    return db.query(`select username
        FROM users
        WHERE username = '` + username + `';`);
}

let listPostsByState = (state) => {
    return db.query(`select usr.username, usr.userimg, usr.state, usr.city, pst.item, pst.price, pst.description, pst.descripimg, usr.email
        FROM posts pst
        INNER JOIN users usr ON usr.id = pst.userid
        WHERE usr.state = '` + state + `';`);
}

let createPost = (postForm) => {
    return db.one(`INSERT INTO posts (item, category, description, price, userid) values 
        ('` + postForm.item + `', '` + postForm.category + `', '` + postForm.description + `', '` + postForm.price + `', '` + postForm.userid + `')
        RETURNING *;`) // re-add '` + descripimg + `',
}

let createUser = (userForm) => {            
    return db.one(`INSERT INTO users (username, password, email, first, last, city, state) values    
    ('` + userForm.username + `', '` + userForm.password + `', '` + userForm.email + `', '` + userForm.first + `', '` + userForm.last + `','` + userForm.city + `', '` + userForm.state + `')
    RETURNING *;`);  
} 

let registerAddImage = (id, path) => {
    return db.one(`UPDATE users SET userimg = $1 WHERE id = $2 RETURNING *;`, [path, id])
}

let postAddImage = (id, path) => {
    return db.one(`UPDATE posts SET descripimg = $1 WHERE id = $2 RETURNING *;`, [path, id])
}

exports.registerAddImage = registerAddImage
exports.postAddImage = postAddImage;
exports.usernameLogin = usernameLogin;
exports.listAllUsers = listAllUsers;
exports.listAllPosts = listAllPosts;
exports.allPostsByUser = allPostsByUser;
exports.onePostsByUser = onePostsByUser;
exports.listPostsByCategory = listPostsByCategory;
exports.listPostsByState = listPostsByState;
exports.createPost = createPost;
exports.createUser = createUser;
exports.checkUser = checkUser;


