const { Router } = require('express');
const Plant = require('../models/Plant');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const { plant_name, description, scientific_name, image, on_market, category_id, price } =
        req.body;
      const plant = await Plant.insert({
        plant_name,
        description,
        scientific_name,
        image,
        category_id,
        on_market,
        userId: req.user.id,
        price,
      });

      res.send(plant);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const plant = await Plant.getAllPlants();

      res.send(plant);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const plant = await Plant.getPlantById(req.params.id);

      res.send(plant);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', ensureAuth, async (req, res, next) => {
    try {
      const { userId } = req.cookies;
      const updatedPlant = await Plant.updatePlantById(req.params.id, userId, {
        ...req.body,
      });
      res.send(updatedPlant);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', ensureAuth, async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const plant = await Plant.deletePlantById(id, userId);
      if (!plant) {
        res.send({ message: 'Cannot delete...' });
      } else {
        res.send({ message: `${plant.id} was deleted` });
      }
    } catch (error) {
      next(error);
    }
  });
