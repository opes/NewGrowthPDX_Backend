const pool = require('../utils/pool.js')
const jwt = require('jsonwebtoken')

module.exports = class User {
  id;
  username;
  email;
  passwordHash;
  userId;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.username = row.username;
    this.passwordHash = row.password_hash;
    this.userId = row.users_id;
  }

  static async insert({ email, username, passwordHash }) {
    const { rows } = await pool.query(
      `
        INSERT INTO users (email, username, password_hash)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [email, username, passwordHash]
    );
    return new User(rows[0]);
  }

  static async findUser(email) {
      const { rows } = await pool.query(
          `SELECT * FROM users WHERE email = $1`,
          [email]
      )
      if(!rows[0]) return null;
      return new User(rows[0]);
  }

  // Does the same as .getMe was doing
  static async findUserById(id) {
      const { rows } = await pool.query(
          `SELECT * FROM users WHERE id = $1`,
          [id]
      )
      if(!rows[0]) return null;
      return new User(rows[0]);
  }

  authToken() {
    return jwt.sign(this.toJSON(), process.env.APP_SECRET, {
      expiresIn: '24h',
    });
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
    };
  }
}
