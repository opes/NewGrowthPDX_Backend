const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');


describe('tests categories', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    return pool.end();
  });

  it('gets all categories', async () => {
    const res = await request(app).get('/api/v1/categories');

    expect(res.body).toEqual([
      { id: '1', name: 'Tropical' },
      { id: '2', name: 'Succulent' },
      { id: '3', name: 'Tree' },
      { id: '4', name: 'Fern' },
      { id: '5', name: 'Bromeliads' },
    ]);
  });
});
