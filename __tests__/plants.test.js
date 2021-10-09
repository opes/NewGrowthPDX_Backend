const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Plant = require('../lib/models/Plant.js');

const agent = request.agent(app);

describe('tests all user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a single plant via POST', async () => {
    await agent.post('/auth/signup').send({
      username: 'testuser',
      email: 'testuser@gmail.com',
      password: 'qwerty',
    });

    const user = await agent.post('/auth/login').send({
      email: 'testuser@gmail.com',
      password: 'qwerty',
    });

    const plant = {
      description: 'this is a healthy plant',
      plant_name: 'monstera',
      scientific_name: '',
      image: 'http://cloudinary.com',
      userId: user.body.id,
    };

    const res = await agent.post('/api/v1/plants').send(plant);

    expect(res.body).toEqual({
      id: '1',
      ...plant,
      category_id: null,
    });
  });

  it('gets all the plants', async () => {
    const monstera = await Plant.insert({
      plant_name: 'Monstera',
      description: 'green',
      scientific_name: '',
      image: 'monstera.jpg',
      category_id: null,
    });
    const fern = await Plant.insert({
      plant_name: 'Fern',
      description: 'fernie-sanders',
      scientific_name: '',
      image: 'fern.jpg',
      category_id: null,
    });
    const begonia = await Plant.insert({
      plant_name: 'Begonia',
      description: 'The Dead loves this flower',
      scientific_name: '',
      image: 'begonia.jpg',
      category_id: null,
    });
    const res = await request(app).get('/api/v1/plants/');
    expect(res.body).toEqual([monstera, fern, begonia]);
  });

  it('gets plant by ID', async () => {
    const monstera = await Plant.insert({
      plant_name: 'Monstera',
      description: 'green',
      scientific_name: '',
      image: 'monstera.jpg',
      category_id: null,
    });

    const res = await request(app).get(`/api/v1/plants/${monstera.id}`);

    expect(res.body).toEqual(monstera);
  });
});
