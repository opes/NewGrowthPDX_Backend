const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

const agent = request.agent(app);

describe('tests all user routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  afterAll(() => {
    return pool.end();
  });

  it('should create a single plant via POST', async () => {
    await agent.post('/auth/signup').send({
      username: 'testuser',
      email: 'testuser@gmail.com',
      password: 'qwerty',
    });

    await agent.post('/auth/login').send({
      email: 'testuser@gmail.com',
      password: 'qwerty',
    });

    const plant = {
      description: 'this is a healthy plant',
      plant_name: 'monstera',
      scientific_name: '',
      image: 'http://cloudinary.com',
    };

    const res = await agent.post('/plants').send(plant);

    expect(res.body).toEqual({
      id: '1',
      ...plant,
      category_id: null
    });
  });
});
