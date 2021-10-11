const pool = require('../utils/pool.js')

module.exports = class Plant {
    id;
    userId;
    plant_name;
    description;
    scientific_name;
    image;
    category_id;

    constructor(row) {
        this.userId = row.users_id;
        this.id = row.id;
        this.plant_name = row.plant_name;
        this.description = row.description;
        this.scientific_name = row.scientific_name;
        this.image = row.image;
        this.category_id = row.category_id;
    }

    static async insert({ plant_name, description, scientific_name, image, category_id, userId }) {
        const { rows } = await pool.query(
            `INSERT INTO plants (plant_name, description, scientific_name, image, category_id, users_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `,
            [plant_name, description, scientific_name, image, category_id, userId]
        );

        return new Plant(rows[0]);
    }

    static async getAllPlants() {
        const { rows } = await pool.query(`SELECT * FROM plants`);
        return rows.map((row) => new Plant(row));
    }

    static async getPlantByID(id) {
        const { rows } = await pool.query(`SELECT * FROM plants WHERE id=$1`, [id]);
        return new Plant(rows[0]);

    }

    static async updatePlantById(plantId, userId, {plant_name, description, scientific_name, image, category_id}) {

        const { rows } = await pool.query(
            'UPDATE plants SET plant_name=$1, description=$2, scientific_name=$3, image=$4, category_id=$5 WHERE id=$6 AND users_id=$7 RETURNING *',
            [plant_name, description, scientific_name, image, category_id, plantId, userId]
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
        const { rows } = await pool.query(`SELECT * FROM plants WHERE users_id=$1`, [userId]);
        return rows.map((row) => new Plant(row));
    }

}