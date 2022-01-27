const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Bike = require('../lib/models/Bike');

describe('Bike backend routes', () => {
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

  it('get all bikes when I do a get', async () => {
    await Bike.insert({ 
      model: 'wahoooooo',
      ride: true,
      love: 3, });
    const res = await request(app).get('/api/v1/bikes');

    expect(res.body).toContainEqual({
      id: expect.any(String),
      model: 'wahoooooo',
      ride: true,
      love: 3,
    });
  });


});
