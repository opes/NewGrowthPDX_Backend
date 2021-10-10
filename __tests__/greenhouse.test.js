const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Plant = require('../lib/models/Plant');
const Agent = request.agent(app);

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

    console.log('LOOK HERE DUMBIES', user.body.id);

    const plant1 = await Plant.insert({
      plant_name: 'Tulip',
      description: 'red',
      scientific_name: '',
      image: 'tulip.jpg',
      category_id: '1',
      userId: user.body.id,
    });
    const plant2 = await Plant.insert({
      plant_name: 'Sunflower',
      description: 'sunflower',
      scientific_name: '',
      image: 'sunflower.jpg',
      category_id: '4',
      userId: user.body.id,
    });
    const plant3 = await Plant.insert({
      plant_name: 'Carnation',
      description: 'The Dead loves this flower',
      scientific_name: '',
      image: 'carnation.jpg',
      category_id: '1',
      userId: user.body.id,
    });

    const response = await request(app).get(
      `/api/v1/greenhouse/${user.body.id}`
    );
    console.log(`${user.body.id}`);
    expect(response).toEqual({ plant1, plant2, plant3 });
  });
});
