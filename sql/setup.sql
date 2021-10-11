DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS plants CASCADE;
DROP TABLE IF EXISTS greenhouse CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(256) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

CREATE TABLE categories (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT
);

CREATE TABLE plants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    plant_name TEXT NOT NULL,
    description TEXT NOT NULL,
    scientific_name VARCHAR(256),
    image TEXT NOT NULL,
    category_id BIGINT REFERENCES categories(id),
    users_id BIGINT REFERENCES users(id),
    on_market BOOLEAN 
);


INSERT INTO categories (name)
VALUES ('Tropical');

INSERT INTO categories (name)
VALUES ('Succulent');

INSERT INTO categories (name)
VALUES ('Tree');

INSERT INTO categories (name)
VALUES ('Fern');

INSERT INTO categories (name)
VALUES ('Bromeliads');

