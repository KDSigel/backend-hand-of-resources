const { Router } = require('express');
const Spirit = require('../models/Spirit');

module.exports = Router().post('/', async (req, res, next) => {
  const spirit = await Spirit.insert({
    category: req.body.category,
    brand: req.body.brand,
    stocked: req.body.stocked,
  });
  res.json(spirit);
});
