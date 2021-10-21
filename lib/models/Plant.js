const pool = require('../utils/pool.js');

module.exports = class Plant {
  id;
  userId;
  plant_name;
  description;
  scientific_name;
  image;
  category_id;
  on_market;
  price;

  constructor(row) {
    this.userId = row.users_id;
    this.id = row.id;
    this.plant_name = row.plant_name;
    this.description = row.description;
    this.scientific_name = row.scientific_name;
    this.image = row.image;
    this.category_id = row.category_id;
    this.on_market = row.on_market;
    this.price = row.price;
  }

  static async insert({
    plant_name,
    description,
    scientific_name,
    image,
    category_id,
    userId,
    on_market,
    price,
  }) {
    const { rows } = await pool.query(
      `INSERT INTO plants (plant_name, description, scientific_name, image, category_id, users_id, on_market, price)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
            `,
      [
        plant_name,
        description,
        scientific_name,
        image,
        category_id,
        userId,
        on_market,
        price,
      ]
    );

    return new Plant(rows[0]);
  }

  static async getAllPlants() {
    const { rows } = await pool.query(`SELECT * FROM plants`);
    return rows.map((row) => new Plant(row));
  }

  static async getPlantById(id) {
    const { rows } = await pool.query(`SELECT * FROM plants WHERE id=$1`, [id]);
    return new Plant(rows[0]);
  }

  static async updatePlantById(
    plantId,
    userId,
    {
      plant_name,
      description,
      scientific_name,
      image,
      category_id,
      on_market,
      price,
    }
  ) {
    const { rows } = await pool.query(
      'UPDATE plants SET plant_name=$1, description=$2, scientific_name=$3, image=$4, category_id=$5, on_market=$6, price=$7 WHERE id=$8 AND users_id=$9 RETURNING *',
      [
        plant_name,
        description,
        scientific_name,
        image,
        category_id,
        on_market,
        price,
        plantId,
        userId,
      ]
    );

    return new Plant(rows[0]);
  }

  static async deletePlantById(id, userId) {
    const { rows } = await pool.query(
      'DELETE FROM plants WHERE id=$1 and users_id=$2 RETURNING *',
      [id, userId]
    );
    return new Plant(rows[0]);
  }

  static async getAllPlantsByUserId(userId) {
    const { rows } = await pool.query(
      `SELECT * FROM plants WHERE users_id=$1`,
      [userId]
    );
    return rows.map((row) => new Plant(row));
  }

  static async getByOnMarket() {
    const { rows } = await pool.query(
      `SELECT * FROM plants WHERE on_market=true`
    );
    return rows.map((row) => new Plant(row));
  }

  static async getAllPlantsByUserId(userId) {
    const { rows } = await pool.query(
      `SELECT * FROM plants WHERE users_id=$1`,
      [userId]
    );
    return rows.map((row) => new Plant(row));
  }
};
