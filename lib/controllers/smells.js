const { Router } = require('express');
const Smell = require('../models/Smell');

module.exports = Router()
  .post('/', async (req, res, next) => {
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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const smell = await Smell.getById(req.params.id);
      res.json(smell);
    } catch (e) {
      next(e);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const smell = await Smell.updateById(req.params.id, { ...req.body });
      res.json(smell);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const smell = await Smell.deleteById(req.params.id);
      res.json(smell);
    } catch (e) {
      next(e);
    }
  });

