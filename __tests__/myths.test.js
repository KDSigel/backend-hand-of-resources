const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Myth = require('../lib/models/Myth');

describe('Art backend routes', () => {
  let testMyth;
  beforeEach(async () => {
    [testMyth] = await Myth.getAll();
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

  it('gets one myth when I do a get call with ID', async () => {
    const res = await request(app).get(`/api/v1/myths/${testMyth.id}`);
    expect(res.body).toEqual({
      id: '1',
      title: 'Trickel-down economics',
      pervasiveness: 'medium',
      believability: 'high',
    });
  });

  it('updates one myth using id', async () => {
    const res = await request(app)
      .patch(`/api/v1/myths/${testMyth.id}`)
      .send({ pervasiveness: 'strangely long-lasting' });

    const expected = {
      id: '1',
      title: 'Trickel-down economics',
      pervasiveness: 'strangely long-lasting',
      believability: 'high',
    };

    expect(res.body).toEqual(expected);
    expect(await Myth.getById(testMyth.id)).toEqual(expected);
  });

  it('deletes a myth by id', async () => {
    const res = await request(app).delete(`/api/v1/myths/${testMyth.id}`);
    expect(res.body).toEqual({
      id: '1',
      title: 'Trickel-down economics',
      pervasiveness: 'medium',
      believability: 'high',
    });
    expect(await Myth.getById(testMyth.id)).toEqual(null);
  });

});
