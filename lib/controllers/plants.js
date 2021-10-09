const { Router } = require('express');
const Plant = require('../models/Plant');
// const jwt = require('jsonwebtoken');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) => {
    try {
      const { plant_name, description, scientific_name, image, category_id } =
        req.body;
      const plant = await Plant.insert({
        plant_name,
        description,
        scientific_name,
        image,
        category_id,
        userId: req.user.id,
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
      const plant = await Plant.getPlantByID(req.params.id);

      res.send(plant);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', ensureAuth, async (req, res, next) => {
    try {
      const { userId } = req.cookies;
      console.log(req.cookies, 'cookies**********************');
      const updatedPlant = await Plant.updatePlantById(
        req.params.id,
        userId,
        {
          ...req.body,
        }
      );
      res.send(updatedPlant);
    } catch (err) {
      next(err);
    }
  });
