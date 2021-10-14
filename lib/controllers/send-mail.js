const { Router } = require('express');
const SendEmail = require('../services/SendMailService');

module.exports = Router().post('/', async (req, res, next) => {
    try {
        const userEmail = await SendEmail.sendTestEmail(req.body);

        res.send(userEmail);
    } catch (error) {
        next(error);
    }
});
