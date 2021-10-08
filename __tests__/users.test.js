require('dotenv').config();

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
      .send({ username: 'testuser', email: 'testuser@gmail.com', password: 'qwerty' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
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
      id: '1',
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
      category_id: null,
    };

    const updatedFern = {
      plant_name: 'Fernard Sanders',
      description: 'a plant for the people',
      scientific_name: '',
      image: 'fern.jpg',
      category_id: null,
    };

    const plant = await Plant.insert({
      ...fern,
      userID: user.body.id,
    });
    
    const updatedPlant = await updatePlantById(plant.id, updatedFern);
  
      expect(updatedPlant).toEqual({
        id: plant.id,
        ...updatedFern,
      })
  })
});
