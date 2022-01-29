const { Router } = require('express');
const Art = require('../models/Art');

module.exports = Router()
  .post('/', async (req, res, next) => {
    const artpiece = await Art.insert({
      title: req.body.title,
      theme: req.body.theme,
      medium: req.body.medium,
      worth: req.body.worth,
    });
    res.json(artpiece);
  })
  .get('/', async (req, res, next) => {
    try {
      const lotsaArt = await Art.getAll();
      res.json(lotsaArt);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const artwork = await Art.getById(req.params.id);
      res.json(artwork);
    } catch (e) {
      next(e);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const artpiece = await Art.updateById(req.params.id, { ...req.body });
      res.json(artpiece);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const art = await Art.deleteById(req.params.id);
      res.json(art);
    } catch (e) {
      next(e);
    }
  });
