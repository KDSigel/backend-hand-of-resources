-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS bikes;

CREATE TABLE bikes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    model VARCHAR NOT NULL,
    ride BOOLEAN NOT NULL,
    love INT NOT NULL
);

INSERT INTO bikes (model, ride, love)
VALUES ('Stumpjumper', 'false', '10');