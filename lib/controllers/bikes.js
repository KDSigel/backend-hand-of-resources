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
  })
  .get('/:id', async (req, res, next) => {
    try {
      // const { id } = req.params;
      const bike = await Bike.getById(req.params.id);
      res.json(bike);
    } catch (e) {
      next(e);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const bike = await Bike.updateById(req.params.id, { ...req.body });
      res.json(bike);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const bike = await Bike.deleteById(req.params.id);
      res.json(bike);
    } catch (e) {
      next(e);
    }
  });

