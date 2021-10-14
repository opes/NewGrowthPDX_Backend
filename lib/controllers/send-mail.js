const { Router } = require('express');
const SendEmail = require('../services/SendMailService');
const User = require('../models/User');
const Plant = require('../models/Plant');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router().post('/', ensureAuth, async (req, res, next) => {
  try {
    const plantId = req.body.plantId;
    const plantForTrade = await Plant.getPlantByID(plantId);
    const toUser = await User.findUserById(plantForTrade.userId);
    const fromEmail = req.body.fromEmail;
    const userEmail = await SendEmail.sendTestEmail({
      to: toUser.email,
      from: fromEmail,
    });

    res.send(userEmail);
  } catch (error) {
    next(error);
  }
});
