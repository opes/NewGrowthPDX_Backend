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
    on_market BOOLEAN NOT NULL,
    price TEXT
);

INSERT INTO categories (name)
VALUES ('Tropical'),
    ('Succulent'),
    ('Tree'),
    ('Fern'),
    ('Bromeliads');

-- Consider moving this into data/setup.js to use the same hashing algorithm and
-- .env variables (for security purposes)
INSERT INTO users (
    username,
    email,
    password_hash
)
VALUES(
    'theRealTestUser',
    'theRealTestUser@gmail.com',
    'pw1234'
);

INSERT INTO plants (
        plant_name,
        description,
        scientific_name,
        image,
        category_id,
        users_id,
        price,
        on_market
    )
VALUES
    (
        'Monstera',
        'This is a healthy plant',
        '',
        'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_sansevieria_charcoal-e1633460982733.jpg?ver=279439',
        '1',
        '1',
        '15',
        true
    ),
    (
        'Aloe',
        'This is a healthy plant',
        '',
        'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_sansevieria_charcoal-e1633460982733.jpg?ver=279439',
        '1',
        '1',
        '15',
        true
    ),
    (
        'Money tree',
        'This is a healthy plant',
        '',
        'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_sansevieria_charcoal-e1633460982733.jpg?ver=279439',
        '1',
        '1',
        '15',
        true
    ),
    (
        'Fern',
        'This is a healthy plant',
        '',
        'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_sansevieria_charcoal-e1633460982733.jpg?ver=279439',
        '1',
        '1',
        '15',
        true
    ),
    (
        'Cactus',
        'This is a healthy plant',
        '',
        'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_sansevieria_charcoal-e1633460982733.jpg?ver=279439',
        '1',
        '1',
        '15',
        true
    );
