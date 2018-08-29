const pg = require('pg-promise')();
const db = pg('postgres://marshallsimpson@localhost:5432/plunder')


let listAllUsers = () => {
    return db.query(`select * from users;`)
}

let listAllPosts = () => {
    return db.query(`select * from posts;`)
}

let usernameLogin = () => {
    return db.one(`select username, password, id
    FROM users
    WHERE username = 'BillyJ456'
    AND password = 'lolrus199';`
    );
}

let allPostsByUser = (username) => {
    return db.query(`select username, name, item, description
        FROM posts
        INNER JOIN users ON users.id = posts.userid
        WHERE username = '` + username + `';`);
}

let onePostsByUser = (username, postId) => {
    return db.one(`select username, name, item, description
        FROM posts
        INNER JOIN users ON users.id = posts.userid
        WHERE username = $1
        AND postid = $2;`, [username, postId]);
}

let listPostsByCategory = (category) => {
    return db.query(`select * 
        FROM posts
        WHERE category = '` + category + `';`);
}

let listPostsByState = (state) => {
    return db.query(`select username, state, name, item, price, description
        FROM posts 
        INNER JOIN users ON users.id = posts.userid
        WHERE state = '` + state + `';`);
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


