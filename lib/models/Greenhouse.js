const pool = require('../utils/pool.js');

module.exports = class Greenhouse {
    users_id;
    plants_id;
    on_market;

    constructor(row) {
        this.users_id = row.users_id;
        this.plants_id = row.plants_id;
        this.on_market = row.on_market;
    }

    static async getAllPlantsByUserId(id, users_id) {
        const { rows } = await pool.query(`SELECT * FROM plants WHERE id=$1 AND users_id=$2`, [id, users_id]);
        return new Greenhouse(rows[0]);
    }

}