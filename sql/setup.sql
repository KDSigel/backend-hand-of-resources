-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS bikes, art;

CREATE TABLE bikes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    model VARCHAR NOT NULL,
    ride BOOLEAN NOT NULL,
    love INT NOT NULL
);

INSERT INTO bikes (model, ride, love)
VALUES ('Stumpjumper', 'false', '10');

CREATE TABLE art (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    theme VARCHAR NOT NULL,
    medium VARCHAR NOT NULL,
    worth money
);

INSERT INTO art (title, theme, medium, worth)
VALUES ('drunkman', 'superhero, booze', 'oil paint', '$200.00');