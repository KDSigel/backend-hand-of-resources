const { Router } = require('express');
const Myth = require('../models/Myth');

module.exports = Router().post('/', async (req, res, next) => {
  const myth = await Myth.insert({
    title: req.body.title,
    pervasiveness: req.body.pervasiveness,
    believability: req.body.believability,
  });
  res.json(myth);
})
.get('/', async (req, res, next) => {
    try {
      const myths = await Myth.getAll();
      res.json(myths);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const myth = await Myth.getById(req.params.id);
      res.json(myth);
    } catch (e) {
      next(e);
    }
  });
