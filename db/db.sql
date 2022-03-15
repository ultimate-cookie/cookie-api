DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(250) NOT NULL,
    points int 
    game_id int NOT NULL
);

-- DROP TABLE IF EXISTS games; 

-- CREATE TABLE games (
--     id serial PRIMARY KEY,
--     category int NOT NULL,
--     rounds int NOT NULL,
--     difficulty varchar(20) NOT NULL  
-- );

