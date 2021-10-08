const { Router } = require('express');
const Plant = require('../models/Plant');
// const jwt = require('jsonwebtoken');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router().post('/', ensureAuth, async (req, res, next) => {
  try {
    const { plant_name, description, scientific_name, image, category_id } = req.body;
    const plant = await Plant.insert({
      plant_name,
      description,
      scientific_name,
      image,
      category_id,
    });

    res.send(plant);
  } catch (error) {
    next(error);
  }
}) // <---END POST CODE BLOCK

 .get('/', async (req, res, next) => {
   try {
     const plant = await Plant.getAllPlants();

     res.send(plant);
   } catch(err) {
     next(err);
   }
 })

 .get('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.getPlantByID(req.params.id);

    res.send(plant);
  
  } catch(err) {
    next(err);
  }
})

 .put('/:id', ensureAuth, async (req, res, next) => {
   try {
     const updatedPlant = await Plant.updatePlantById(req.params.id, req.user.id, {
       ...req.body
     })
     res.send(updatedPlant);
   } catch(err) {
     next(err);
   }
 })
