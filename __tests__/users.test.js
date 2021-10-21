const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Plant = require('../lib/models/Plant.js');
const { updatePlantById } = require('../lib/models/Plant.js');

const agent = request.agent(app);

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
      .send({
        username: 'testuser',
        email: 'testuser@gmail.com',
        password: 'qwerty',
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: '2',
          username: 'testuser',
          email: 'testuser@gmail.com',
        });
      });
  });

  it('should login a user', async () => {
    const res = await agent.post('/auth/login').send({
      email: 'testuser@gmail.com',
      password: 'qwerty',
    });
    expect(res.body).toEqual({
      id: '2',
      username: 'testuser',
      email: 'testuser@gmail.com',
    });
  });

  it('updates a plant record', async () => {
    const user = await agent.post('/auth/login').send({
      email: 'testuser@gmail.com',
      password: 'qwerty',
    });

    const fern = {
      plant_name: 'Fern',
      description: 'fernie-sanders',
      scientific_name: '',
      image: 'fern.jpg',
      category_id: '4',
      on_market: true,
      price: '$15',
      userId: user.body.id,
    };

    const updatedFern = {
      plant_name: 'Fernard Sanders',
      description: 'a plant for the people',
      scientific_name: '',
      image: 'fern.jpg',
      category_id: '4',
      on_market: false,
      price: '$15',
      userId: user.body.id,
    };

    const plant = await Plant.insert(fern);

    const updatedPlant = await updatePlantById(
      plant.id,
      user.body.id,
      updatedFern
    );

    expect(updatedPlant).toEqual({
      id: plant.id,
      userId: user.body.id,
      ...updatedFern,
    });
  });

  it('deletes a plant record', async () => {
    const user = await agent.post('/auth/login').send({
      email: 'testuser@gmail.com',
      password: 'qwerty',
    });

    const fern = {
      plant_name: 'Fern',
      description: 'fernie-sanders',
      scientific_name: '',
      image: 'fern.jpg',
      category_id: '4',
      on_market: true,
      userId: user.body.id,
      id: '7'
    };

    const plant = await Plant.insert(fern);

    const res = await Plant.deletePlantById(fern.id, user.body.id);
    expect(res).toEqual({
      ...plant,
    });
  });

  it('logs out a user', async () => {
    await agent.post('/auth/login').send({
      email: 'testuser@gmail.com',
      password: 'qwerty',
    });

    const res = await agent.get('/auth/logout');

    expect(res.body).toEqual({
      message: 'you have logged out',
    });
  });
});
