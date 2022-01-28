const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Spirits backend routes', () => {
  //   let testSpirit;
  beforeEach(async () => {
    // [testSpirit] = await Spirit.getAll();
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('adds a spirit when I post', async () => {
    const res = await request(app).post('/api/v1/spirits/').send({
      category: 'mezcal',
      brand: 'Vida',
      stocked: true,
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      category: 'mezcal',
      brand: 'Vida',
      stocked: true,
    });
  });
});
