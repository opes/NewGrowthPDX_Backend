const { Router } = require('express');
const Greenhouse = require('../models/Greenhouse');

module.exports = Router().get('/:id', async (req, res, next) => {
  try {
    const greenhouse = await Greenhouse.getAllPlantsByUserId(req.params.id);
    res.send(greenhouse);
  } catch (error) {
    next(error);
  }
});
