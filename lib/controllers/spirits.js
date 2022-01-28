const { Router } = require('express');
const Spirit = require('../models/Spirit');

module.exports = Router()
  .post('/', async (req, res, next) => {
    const spirit = await Spirit.insert({
      category: req.body.category,
      brand: req.body.brand,
      stocked: req.body.stocked,
    });
    res.json(spirit);
  })
  .get('/', async (req, res, next) => {
    try {
      const spirits = await Spirit.getAll();
      res.json(spirits);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const spirit = await Spirit.getById(req.params.id);
      res.json(spirit);
    } catch (e) {
      next(e);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const spirit = await Spirit.updateById(req.params.id, { ...req.body });
      res.json(spirit);
    } catch (e) {
      next(e);
    }
  });
