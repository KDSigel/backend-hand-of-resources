const { Router } = require('express');
const Art = require('../models/Art');

module.exports = Router().post('/', async (req, res, next) => {
  const artpiece = await Art.insert({
    title: req.body.title,
    theme: req.body.theme,
    medium: req.body.medium,
    worth: req.body.worth,
  });
  res.json(artpiece);
});
