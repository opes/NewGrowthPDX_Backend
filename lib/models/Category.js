const pool = require('../utils/pool.js');

module.exports = class Category {
  id;
  name;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
  }

  static async getAllCategories() {
    const { rows } = await pool.query(`SELECT * FROM categories`);
    return rows.map((row) => new Category(row));
  }
};
