import client from '../lib/client';
import plantSeed from './plantSeed';
const { getEmoji } = require('../lib/emoji.js');

run();

async function run() {
  try {

    await Promise.all(
      plantSeed.map((plant) => {
        return client.query(
          `INSERT INTO plants (plant_name, description, scientific_name, image, category_id, users_id, on_market)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
          [
            plant.plant_name,
            plant.description,
            plant.scientific_name,
            plant.image,
            plant.category_id,
            plant.users_id,
            plant.on_market
          ]
        );
      })
    );

    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
}