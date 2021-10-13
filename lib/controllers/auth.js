const { Router } = require('express');
const UserService = require('../services/UserService.js');
const jwt = require('jsonwebtoken');
const ensureAuth = require('../middleware/ensureAuth');
const User = require('../models/User');

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      const userJwt = jwt.sign(user.toJSON(), process.env.APP_SECRET, {
        expiresIn: '24h',
      });
      res.cookie('userId', userJwt, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 10,
      });
      res.send(user);
    } catch (error) {
      next(error);
    }
  })

  .post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.authorize(email, password);
      res.cookie('userId', user.authToken(), {
        sameSite: 'None',
        secure: true,
        httpOnly: true,
        maxAge: 6000 * 60 * 24 * 10,
      });

      res.send(user);
    } catch (error) {
      next(error);
    }
  })

  .get('/logout', (req, res, next) => {
    try {
      res.clearCookie('userId', {
        sameSite: 'None',
        secure: true,
        httpOnly: true,
      });
      res.send({
        message: 'you have logged out',
      });
    } catch (error) {
      next(error);
    }
  })

  .get('/me', ensureAuth, async (req, res, next) => {
    try {
      const { userId } = req.cookies;
      const user = await User.getMe(userId);
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
