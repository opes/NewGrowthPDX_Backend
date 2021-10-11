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
      userId: user.body.id,
    };
    const plant2 = {
      plant_name: 'Sunflower',
      description: 'sunflower',
      scientific_name: '',
      image: 'sunflower.jpg',
      category_id: '4',
      on_market: true,
      userId: user.body.id,
    };
    const plant3 = {
      plant_name: 'rose',
      description: 'The Dead loves this flower sometimes',
      scientific_name: '',
      image: 'rose.jpg',
      category_id: '2',
      on_market: true,
      userId: user.body.id,
    };

    const resPlant1 = await Plant.insert(plant1);
    const resPlant2 = await Plant.insert(plant2);
    const resPlant3 = await Plant.insert(plant3);

    console.log(resPlant1, resPlant2, resPlant3);

    // await Agent.post('/api/v1/plants').send(plant1);
    // await Agent.post('/api/v1/plants').send(plant2);
    // await Agent.post('/api/v1/plants').send(plant3);

    // const response = await request(app).get(
    //   `/api/v1/greenhouse/${user.body.id}`
    // );

    const response = await Plant.getAllPlantsByUserId(user.body.id);
    console.log(response, 'look here');

    expect(response).toEqual([
      { ...plant1, id: '1' },
      { ...plant2, id: '2' },
      { ...plant3, id: '3' },
    ]);
  });
});
