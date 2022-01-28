const { Router } = require('express');
const Smell = require('../models/Smell');

module.exports = Router().post('/', async (req, res, next) => {
  const smell = await Smell.insert({
    title: req.body.title,
    strength: req.body.strength,
    enjoyable: req.body.enjoyable,
  });
  res.json(smell);
})
.get('/', async (req, res, next) => {
    try {
      const smell = await Smell.getAll();
      res.json(smell);
    } catch (e) {
      next(e);
    }
  });
