const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Agent = request.agent(app);
const Plant = require('../lib/models/Plant');

describe('test greenhouse', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    return pool.end();
  });

  it('getting a users greenhouse', async () => {
    await request(app).post('/auth/signup').send({
      email: 'joe@johndoh.com',
      password: 'qwerty',
      username: 'SomeDude',
    });

    const user = await Agent.post('/auth/login').send({
      email: 'joe@johndoh.com',
      password: 'qwerty',
    });

    const plant1 = {
      plant_name: 'Tulip',
      description: 'red',
      scientific_name: '',
      image: 'tulip.jpg',
      category_id: '4',
      on_market: true,
      price: '$15',
      userId: user.body.id,
    };
    const plant2 = {
      plant_name: 'Sunflower',
      description: 'sunflower',
      scientific_name: '',
      image: 'sunflower.jpg',
      category_id: '4',
      on_market: true,
      price: '$15',
      userId: user.body.id,
    };
    const plant3 = {
      plant_name: 'rose',
      description: 'The Dead loves this flower sometimes',
      scientific_name: '',
      image: 'rose.jpg',
      category_id: '2',
      on_market: true,
      price: '$15',
      userId: user.body.id,
    };

    await Plant.insert(plant1);
    await Plant.insert(plant2);
    await Plant.insert(plant3);

    const response = await Plant.getAllPlantsByUserId(user.body.id);

    expect(response).toEqual([
      { ...plant1, id: '6' },
      { ...plant2, id: '7' },
      { ...plant3, id: '8' },
    ]);
  });
});
