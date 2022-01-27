const pool = require('../utils/pool');

module.exports = class Bike {
  id;
  model;
  ride;
  love;

  constructor(row) {
    this.id = row.id;
    this.model = row.model;
    this.ride = row.ride;
    this.love = row.love;
  }

  static async insert({ model, ride, love }) {
    const { rows } = await pool.query(
      'INSERT INTO bikes(model, ride, love) VALUES ($1, $2, $3) RETURNING * ',
      [model, ride, love]
    );
    return new Bike(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM bikes'
    );
    return rows.map((row) => new Bike(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM bikes WHERE id=$1', [id]
    );
    if(!rows[0]) return null;
    return new Bike(rows[0]);
  }

  static async updateById(id, newBike) {
    const result = await pool.query('SELECT * FROM bikes WHERE id=$1', [
      id
    ]);
    const existingBike = result.rows[0];
  
    if (!existingBike) {
      const error = new Error(`Bike ${id} not found`);
      error.status = 404;
      throw error;
    }
    const newModel = newBike.model ?? existingBike.model;
    const newRide = newBike.ride ?? existingBike.ride;
    const newLove = newBike.love ?? existingBike.love;

    const { rows } = await pool.query(
      'UPDATE bikes SET model=$2, ride=$3, love=$4 WHERE id=$1 RETURNING *;',
      [id, newModel, newRide, newLove]
    );
    return new Bike(rows[0]);
  }

};
