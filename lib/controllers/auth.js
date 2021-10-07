const { Router } = require('express');
const UserService = require('../services/UserService.js');

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body.user);
      res.cookie('session', user.authToken(), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 10,
      });
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
