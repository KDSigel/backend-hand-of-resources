const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Spirit = require('../lib/models/Spirit');

describe('Spirits backend routes', () => {
    let testSpirit;
  beforeEach(async () => {
    [testSpirit] = await Spirit.getAll();
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

  it('gets all spirits when I do a get', async () => {
    await Spirit.insert({
      category: 'mezcal',
      brand: 'Vida',
      stocked: true,
    });
    const res = await request(app).get('/api/v1/spirits');

    expect(res.body).toContainEqual({
      id: expect.any(String),
      category: 'mezcal',
      brand: 'Vida',
      stocked: true,
    });
  });

  it('gets one spirit when I do a get call with ID', async () => {
    const res = await request(app).get(`/api/v1/spirit/${testSpirit.id}`);
    expect(res.body).toEqual({
      id: '1',
      category: 'Scotch',
      brand: 'Laphroaig',
      stocked: true,
    });
  });

});
