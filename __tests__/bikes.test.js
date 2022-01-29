const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Bike = require('../lib/models/Bike');

describe('Bike backend routes', () => {
  let testBike;
  beforeEach(async () => {
    [testBike] = await Bike.getAll();
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('add a bike when I do a post', async () => {
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
      love: 3,
    });
    const res = await request(app).get('/api/v1/bikes');

    expect(res.body).toContainEqual({
      id: expect.any(String),
      model: 'wahoooooo',
      ride: true,
      love: 3,
    });
  });

  it('gets one bike when I do a get call with ID', async () => {
    const res = await request(app).get(`/api/v1/bikes/${testBike.id}`);
    expect(res.body).toEqual({
      id: '1',
      model: 'Stumpjumper',
      ride: false,
      love: 10,
    });
  });

  it('updates the info for one bike', async () => {
    const res = await request(app)
      .patch(`/api/v1/bikes/${testBike.id}`)
      .send({ love: 8 });

    const expected = {
      id: expect.any(String),
      model: 'Stumpjumper',
      ride: false,
      love: 8,
    };

    expect(res.body).toEqual(expected);
    expect(await Bike.getById(testBike.id)).toEqual(expected);
  });

  it('deletes a bike by id', async () => {
    const res = await request(app).delete(`/api/v1/bikes/${testBike.id}`);
    expect(res.body).toEqual({
      id: expect.any(String),
      model: 'Stumpjumper',
      ride: false,
      love: 10
    });
    expect(await Bike.getById(testBike.id)).toEqual(null);
  });

});
