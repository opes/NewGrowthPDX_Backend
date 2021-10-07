const pool = require('../utils/pool.js')
const jwt = require('jsonwebtoken')

module.exports = class User {
  id;
  username;
  email;
  passwordHash;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.username = row.username;
    this.passwordHash = row.password_hash;
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
  static async findUser() {
      const { rows } = await pool.query(
          `SELECT * FROM users`
      )
      return rows.map((row) => new User(row))
  }
}