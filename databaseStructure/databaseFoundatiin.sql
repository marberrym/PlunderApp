CREATE TABLE Users (
    userid serial primary key,
    username character varying (200),
    password character varying (200),
    email character varying (200),
    first character varying (200),
    last character varying (200),
    city character varying (200),
    state character varying (200),
    rating integer,
);

-- CREATE TABLE Locations (

-- );

CREATE TABLE Post (
    name character varying (200),
    item character varying (200),
    category character varying (200),
    description TEXT, 
    price integer, 
    postUserid integer,

);


