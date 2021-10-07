const { Router } = require('express');
const UserService = require('../services/UserService.js');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      const userJwt = jwt.sign(user.toJSON(), process.env.APP_SECRET, {
        expiresIn: '24h',
      });
      res.cookie('session', userJwt, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 10,
      });
      res.send(user);
    } catch (error) {
      next(error);
    }
  })

  .post('/login', async (req, res, next) => {
    console.log('/login', '----------------------------');
    try {
      const { email, password } = req.body;
      console.log(email, password, '************');
      const user = await UserService.authorize(email, password);
      console.log('xxxxxxxxxxxxxxx');
      res.cookie('session', user.authToken(), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 10,
      });
      res.send(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });



