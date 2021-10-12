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
      category_id: '1',
      on_market: true,
      price: '$15'
    };

    const res = await agent.post('/api/v1/plants').send(plant);

    expect(res.body).toEqual({
      id: '6',
      ...plant,
      category_id: '1',
    });
  });

  it('gets all the plants', async () => {
    const monstera = {
      plant_name: 'monstera',
      description: 'this is a healthy plant',
      scientific_name: '',
      image:
        'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_sansevieria_charcoal-e1633460982733.jpg?ver=279439',
      category_id: '1',
      userId: '1',
      on_market: true,
      price: '$15',
      id: '1',
    };
    const aloe = {
      plant_name: 'aloe',
      description: 'this is a healthy plant',
      scientific_name: '',
      image:
        'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_sansevieria_charcoal-e1633460982733.jpg?ver=279439',
      category_id: '1',
      userId: '1',
      on_market: true,
      price: '$15',
      id: '2',
    };

    const moneyTree = {
      plant_name: 'money tree',
      description: 'this is a healthy plant',
      scientific_name: '',
      image:
        'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_sansevieria_charcoal-e1633460982733.jpg?ver=279439',
      category_id: '1',
      userId: '1',
      on_market: true,
      price: '$15',
      id: '3',
    };
    const fern = {
      plant_name: 'fern',
      description: 'this is a healthy plant',
      scientific_name: '',
      image:
        'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_sansevieria_charcoal-e1633460982733.jpg?ver=279439',
      category_id: '1',
      userId: '1',
      on_market: true,
      price: '$15',
      id: '4',
    };
    const cactus = {
      plant_name: 'cactus',
      description: 'this is a healthy plant',
      scientific_name: '',
      image:
        'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_sansevieria_charcoal-e1633460982733.jpg?ver=279439',
      category_id: '1',
      userId: '1',
      on_market: true,
      price: '$15',
      id: '5',
    };

    const res = await request(app).get('/api/v1/plants/');
    expect(res.body).toEqual(expect.arrayContaining([aloe, monstera, moneyTree, fern, cactus]));
  });

  it('gets plant by ID', async () => {
    const monstera = await Plant.insert({
      plant_name: 'Monstera',
      description: 'green',
      scientific_name: '',
      image: 'monstera.jpg',
      category_id: '1',
      on_market: true,
    });

    const res = await request(app).get(`/api/v1/plants/${monstera.id}`);

    expect(res.body).toEqual(monstera);
  });

  it('gets plants by on_market', async () => {
    await agent.post('/auth/signup').send({
      username: 'testuser2',
      email: 'testuser2@gmail.com',
      password: 'qwerty',
    });

    const user = await agent.post('/auth/login').send({
      email: 'testuser2@gmail.com',
      password: 'qwerty',
    });

    const monsteraOnMarket = await Plant.insert({
      plant_name: 'Monstera',
      description: 'green',
      scientific_name: '',
      image: 'monstera.jpg',
      category_id: '1',
      userId: user.body.id,
      on_market: true,
    });
    const catusOffMarket = await Plant.insert({
      plant_name: 'Monstera',
      description: 'green',
      scientific_name: '',
      image: 'monstera.jpg',
      category_id: '1',
      userId: user.body.id,
      on_market: false,
    });
    const fernOnMarket = await Plant.insert({
      plant_name: 'fern',
      description: 'green',
      scientific_name: '',
      image: 'fern.jpg',
      category_id: '1',
      userId: user.body.id,
      on_market: true,
    });

    const res = await Plant.getByOnMarket();

    expect(res).toEqual(expect.arrayContaining([monsteraOnMarket, fernOnMarket]));
  });
});
