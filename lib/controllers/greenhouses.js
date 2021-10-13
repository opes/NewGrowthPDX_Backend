const { Router } = require('express');
const Plant = require('../models/Plant');

module.exports = Router().get('/:id', async (req, res, next) => {
  try {
    const greenhouse = await Plant.getAllPlantsByUserId(req.params.id);
    res.send(greenhouse);
  } catch (error) {
    next(error);
  }
});
