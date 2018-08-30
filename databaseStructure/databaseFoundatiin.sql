CREATE TABLE users (
    id serial primary key,
    username character varying (200),
    userimg character varying(255),
    password character varying (200),
    email character varying (200),
    first character varying (200),
    last character varying (200),
    city character varying (200),
    state character varying (200),
    rating integer
);

-- CREATE TABLE locations (

-- );

CREATE TABLE posts (
    id serial primary key,
    item character varying (200),
    category character varying (200),
    description TEXT, 
    descripimg character varying(255),
    price integer, 
    userid integer REFERENCES users(id)
);


