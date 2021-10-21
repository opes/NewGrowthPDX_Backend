const fs = require('fs').promises;

module.exports = (pool) => {
  return fs
    .readFile(`${__dirname}/../sql/setup.sql`, { encoding: 'utf-8' })
    .then((sql) => pool.query(sql))
    // You could add the test user creation here:
    // .then(async () => await UserService.create({ email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD, username: process.env.TEST_USER_USERNAME }))
};
