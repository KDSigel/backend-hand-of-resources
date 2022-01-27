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
};
