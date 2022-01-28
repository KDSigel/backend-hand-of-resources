const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Art = require('../lib/models/Art');

describe('Art backend routes', () => {
  let testArt;
  beforeEach(async () => {
    [testArt] = await Art.getAll();
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
      worth: '$1,000,000.00',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'lalaladoobeedoooooo',
      theme: 'chaos, misery, sexuality',
      medium: 'sculpture',
      worth: '$1,000,000.00',
    });
  });

  it('gets all art when I do a get', async () => {
    await Art.insert({
      title: 'famous in Tacoma',
      theme: 'the underbelly of society, wrath',
      medium: 'watercolor',
      worth: '$37,000.00',
    });
    const res = await request(app).get('/api/v1/art');

    expect(res.body).toContainEqual({
      id: expect.any(String),
      title: 'famous in Tacoma',
      theme: 'the underbelly of society, wrath',
      medium: 'watercolor',
      worth: '$37,000.00',
    });
  });

  it('gets one art piece when I do a get call with ID', async () => {
    const res = await request(app).get(`/api/v1/art/${testArt.id}`);
    expect(res.body).toEqual({
      id: '1',
      title: 'drunkman',
      theme: 'superhero, booze',
      medium: 'oil paint',
      worth: '$300.00',
    });
  });
});
