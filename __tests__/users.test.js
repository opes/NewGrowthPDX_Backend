const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
// const User = require('../lib/models/User.js');
const agent = request.agent(app);

describe('tests all user routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  afterAll(() => {
    return pool.end();
  });
  it('creates a user via POST', async () => {
    const res = await agent.post('/api/v1/auth/signup').send({
      username: 'testuser',
      email: 'testuser@gmail.com',
      password: 'qwerty',
    });
    expect(res.body).toEqual({
      id: '1',
      username: 'testuser',
      email: 'testuser@gmail.com',
    });
  });
});
