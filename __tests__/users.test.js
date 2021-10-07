const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
// const User = require('../lib/models/User.js');
// const agent = request.agent(app);

describe('tests all user routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  afterAll(() => {
    return pool.end();
  });

  it('should signup a user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ username: 'testuser', email: 'testuser@gmail.com', password: 'qwerty' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          username: 'testuser',
          email: 'testuser@gmail.com',
        });
      });
  });
});
