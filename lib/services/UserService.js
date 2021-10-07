const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
// const jwt = require('jsonwebtoken')

module.exports = class UserService {
  static async create({ email, password, username }) {
    const passwordHash = bcrypt.hashSync(password, Number(10));

    return User.insert({ email, passwordHash, username });
  }
};


