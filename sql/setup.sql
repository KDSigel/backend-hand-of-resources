-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS bikes, art, spirits, myths, smells;

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
VALUES ('drunkman', 'superhero, booze', 'oil paint', '$300.00');

CREATE TABLE spirits (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category VARCHAR NOT NULL,
    brand VARCHAR NOT NULL,
    stocked BOOLEAN NOT NULL
);

INSERT INTO spirits (category, brand, stocked)
VALUES ('Scotch', 'Laphroaig', 'true');

CREATE TABLE myths (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    pervasiveness VARCHAR NOT NULL,
    believability VARCHAR NOT NULL
);

INSERT INTO myths (title, pervasiveness, believability)
VALUES ('Trickel-down economics', 'medium', 'high');

-- CREATE TABLE smells (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     title VARCHAR NOT NULL,
--     strength VARCHAR NOT NULL,
--     enjoyable BOOLEAN NOT NULL
-- );

-- INSERT INTO smells (title, strength, enjoyable)
-- VALUES ('garlic', 'medium', 'true');

