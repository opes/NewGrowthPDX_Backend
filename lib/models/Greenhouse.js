const pool = require('../utils/pool.js');

module.exports = class Greenhouse {
    id;
    userId;
    plants_id;
    on_market;

    constructor(row) {
        this.id = row.id
        this.userId = row.users_id ;
        this.plants_id = row.plants_id;
        this.on_market = row.on_market;
    }

    static async getAllPlantsByUserId(userId) {
        const { rows } = await pool.query(`SELECT * FROM plants WHERE users_id=$1`, [userId]);
        return new Greenhouse(rows[0]);
    }

}