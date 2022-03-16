
-- inset data into tables
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id serial PRIMARY KEY,
    username varchar(250) NOT NULL,
    points INTEGER DEFAULT 0, 
    game_id varchar(250) NOT NULL
);

INSERT INTO users (username, points, game_id)
VALUES
    ('saka', 50 , 'test'),
    ('Auba', 5 , 'test'),
    ('salah', 8, 'liverpool'),
    ('laca', 57 , 'test');
