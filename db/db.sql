DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(250) NOT NULL,
    lobby_id int NOT NULL
);

-- DROP TABLE IF EXISTS lobbies; 

-- CREATE TABLE lobbies (
--     id serial PRIMARY KEY,
--     category int NOT NULL,
--     rounds int NOT NULL,
--     difficulty varchar(20) NOT NULL  
-- );

-- // talk to group about this
