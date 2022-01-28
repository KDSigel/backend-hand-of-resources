const { Router } = require('express');
const Myth = require('../models/Myth');

module.exports = Router().post('/', async (req, res, next) => {
  const myth = await Myth.insert({
    title: req.body.title,
    pervasiveness: req.body.pervasiveness,
    believability: req.body.believability,
  });
  res.json(myth);
});
