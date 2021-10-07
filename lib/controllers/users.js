const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const user = await User.findUser();
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
