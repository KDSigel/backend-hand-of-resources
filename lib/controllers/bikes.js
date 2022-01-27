const { Router } = require('express');
const Bike = require('../models/Bike');

module.exports = Router()
  .post('/', async (req, res, next) => {
    const bike = await Bike.insert({
      model: req.body.model,
      ride: req.body.ride,
      love: req.body.love,
    });
    res.json(bike);
  })
  .get('/', async (req, res, next) => {
    try {
      const bikes = await Bike.getAll();
      res.json(bikes);
    } catch (e) {
      next(e);
    }
  });
