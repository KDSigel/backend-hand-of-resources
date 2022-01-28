const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Smell = require('../lib/models/Smell');

describe('Smell backend routes', () => {
    let testSmell;
  beforeEach(async () => {
    [testSmell] = await Smell.getAll();
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('add Smell when I do a post', async () => {
    const res = await request(app).post('/api/v1/smells/').send({
      title: 'carrots',
      strength: 'minor',
      enjoyable: true,
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'carrots',
      strength: 'minor',
      enjoyable: true,
    });
  });

  it('gets all smells when I do a get', async () => {
    await Smell.insert({
      title: 'carrots',
      strength: 'minor',
      enjoyable: true,
    });
    const res = await request(app).get('/api/v1/smells');

    expect(res.body).toContainEqual({
      id: expect.any(String),
      title: 'carrots',
      strength: 'minor',
      enjoyable: true,
    });
  });

  it('gets one smell when I do a get call with ID', async () => {
    const res = await request(app).get(`/api/v1/smells/${testSmell.id}`);
    expect(res.body).toEqual({
      id: '1',
      title: 'garlic',
      strength: 'medium',
      enjoyable: true,
    });
  });

});
