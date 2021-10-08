const pool = require('../utils/pool.js')

module.exports = class Plant {
    id;
    plant_name;
    description;
    scientific_name;
    image;
    category_id;

    constructor(row) {
        this.id = row.id;
        this.plant_name = row.plant_name;
        this.description = row.description;
        this.scientific_name = row.scientific_name;
        this.image = row.image;
        this.category_id = row.category_id;
    }

    static async insert({ plant_name, description, scientific_name, image, category_id }) {
        const { rows } = await pool.query(
            `INSERT INTO plants (plant_name, description, scientific_name, image, category_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [plant_name, description, scientific_name, image, category_id]
        );
        return new Plant(rows[0]);
    }

    static async getAllPlants() {
        const { rows } = await pool.query(`SELECT * FROM plants`);
        return rows.map((row) => new Plant(row));
      }
    
}