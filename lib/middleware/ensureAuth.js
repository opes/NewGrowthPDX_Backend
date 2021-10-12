const jwt = require('jsonwebtoken');

module.exports = function ensureAuth (req, res, next) {
  try {
    const { userId } = req.cookies;
    const payload = jwt.verify(userId, process.env.APP_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    error.status = 401;
    error.message = 'Please login';
    next(error);
  }
};

