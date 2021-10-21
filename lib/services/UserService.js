const bcrypt = require('bcryptjs');
const User = require('../models/User.js');

module.exports = class UserService {
  static async create({ email, password, username }) {
    const passwordHash = bcrypt.hashSync(password, Number(10));
    return User.insert({ email, passwordHash, username });
  }

  static async authorize(email, password) {
    const user = await User.findUser(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const matchingPassword = await bcrypt.compare(password, user.passwordHash);
    if (!matchingPassword) {
      throw new Error('Invalid email or password');
    }
    return user;
  }
};
