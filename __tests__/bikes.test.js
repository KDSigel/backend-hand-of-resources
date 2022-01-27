const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('add a bike when I do a post?', async () => {
    const res = await request(app).post('/api/v1/bikes/').send({
      model: 'dooobeeedoo',
      ride: false,
      love: 4,
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      model: 'dooobeeedoo',
      ride: false,
      love: 4,
    });

  });
});
