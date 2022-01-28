const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Myth = require('../lib/models/Myth');

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

  it('gets all myths when I do a get', async () => {
    await Myth.insert({
      title: 'religion',
      pervasiveness: 'waning',
      believability: 'low',
    });
    const res = await request(app).get('/api/v1/myths');

    expect(res.body).toContainEqual({
      id: expect.any(String),
      title: 'religion',
      pervasiveness: 'waning',
      believability: 'low',
    });
  });


  
});
