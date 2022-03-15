DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id serial PRIMARY KEY,
    username varchar(250) NOT NULL,
    points INTEGER DEFAULT 0, 
    game_id varchar(250) NOT NULL
);

-- DROP TABLE IF EXISTS games; 

-- CREATE TABLE games (
--     id serial PRIMARY KEY,
--     category int NOT NULL,
--     rounds int NOT NULL,
--     difficulty varchar(20) NOT NULL  
-- );

