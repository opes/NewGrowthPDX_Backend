const { Router } = require('express');
const UserService = require('../services/UserService.js');
const ensureAuth = require('../middleware/ensureAuth');
const User = require('../models/User');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);

      res.cookie('userId', user.authToken(), {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
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
        maxAge: ONE_DAY_IN_MS,
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
      const user = await User.findUserById(userId);
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
