const pool = require('../utils/pool');

module.exports = class Spirit {
  id;
  category;
  brand;
  stocked;

  constructor(row) {
    this.id = row.id;
    this.category = row.category;
    this.brand = row.brand;
    this.stocked = row.stocked;
  }

  static async insert({ category, brand, stocked }) {
    const { rows } = await pool.query(
      'INSERT INTO spirits (category, brand, stocked) VALUES ($1, $2, $3) RETURNING * ',
      [category, brand, stocked]
    );
    return new Spirit(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from spirits');
    return rows.map((row) => new Spirit(row));
  }
};
