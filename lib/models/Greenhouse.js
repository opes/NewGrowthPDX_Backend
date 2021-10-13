const pool = require('../utils/pool.js');

module.exports = class Greenhouse {
    id;
    userId;
    plants_id;
    on_market;
    price;
    image;

    constructor(row) {
        this.id = row.id
        this.userId = row.users_id ;
        this.plants_id = row.plants_id;
        this.on_market = row.on_market;
        this.price = row.price;
        this.image = row.image;
    }

    // static async getAllPlantsByUserId(userId) {
    //     const { rows } = await pool.query(`SELECT * FROM plants WHERE users_id=$1`, [userId]);
    //     return rows.map((row) => new Greenhouse(row));
    // }

}