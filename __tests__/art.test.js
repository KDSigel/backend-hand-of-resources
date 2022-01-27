const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Art = require('../lib/models/Art');

describe('Art backend routes', () => {
  // let testart;
  beforeEach(async () => {
    // [testart] = await Art.getAll();
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('add Art when I do a post', async () => {
    const res = await request(app).post('/api/v1/art/').send({
      title: 'lalaladoobeedoooooo',
      theme: 'chaos, misery, sexuality',
      medium: 'sculpture',
      worth: '$1,000,000',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'lalaladoobeedoooooo',
      theme: 'chaos, misery, sexuality',
      medium: 'sculpture',
      worth: '$1,000,000',
    });
  });

});
