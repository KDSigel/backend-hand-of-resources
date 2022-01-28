const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Art backend routes', () => {
  // let testMyth;
  beforeEach(async () => {
    // [testMyth] = await Myth.getAll();
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('add Myth when I do a post', async () => {
    const res = await request(app).post('/api/v1/myths/').send({
      title: 'religion',
      pervasiveness: 'waning',
      believability: 'low',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'religion',
      pervasiveness: 'waning',
      believability: 'low',
    });
  });
});
