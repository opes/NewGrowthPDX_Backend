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
    on_market BOOLEAN NOT NULL
);

INSERT INTO categories (name)
VALUES ('Tropical'),
    ('Succulent'),
    ('Tree'),
    ('Fern'),
    ('Bromeliads');

INSERT INTO users (
    username,
    email,
    password_hash
)
VALUES(
    'testuser',
    'testuser@gmail.com',
    'pw1234'
);

INSERT INTO plants (
        plant_name,
        description,
        scientific_name,
        image,
        category_id,
        users_id,
        on_market
    )
VALUES
    (
        'monstera',
        'this is a healthy plant',
        '',
        'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_sansevieria_charcoal-e1633460982733.jpg?ver=279439',
        '1',
        '1',
        true
    ),
    (
        'aloe',
        'this is a healthy plant',
        '',
        'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_sansevieria_charcoal-e1633460982733.jpg?ver=279439',
        '1',
        '1',
        true
    ),
    (
        'money tree',
        'this is a healthy plant',
        '',
        'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_sansevieria_charcoal-e1633460982733.jpg?ver=279439',
        '1',
        '1',
        true
    ),
    (
        'fern',
        'this is a healthy plant',
        '',
        'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_sansevieria_charcoal-e1633460982733.jpg?ver=279439',
        '1',
        '1',
        true
    ),
    (
        'cactus',
        'this is a healthy plant',
        '',
        'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_sansevieria_charcoal-e1633460982733.jpg?ver=279439',
        '1',
        '1',
        true
    );