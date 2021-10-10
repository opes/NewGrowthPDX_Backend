const { Router } = require('express');
const Category = require('../models/Category');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const category = await Category.getAllCategories();

    res.send(category);
  } catch (err) {
    next(err);
  }
});
