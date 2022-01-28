const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Smell backend routes', () => {
//   let testSmell;
  beforeEach(async () => {
    // [testSmell] = await Smell.getAll();
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('add Smell when I do a post', async () => {
    const res = await request(app).post('/api/v1/smells/').send({
      title: 'carrots',
      strength: 'minor',
      enjoyable: 'medium',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'carrots',
      strength: 'minor',
      enjoyable: 'medium',
    });
  });

});
