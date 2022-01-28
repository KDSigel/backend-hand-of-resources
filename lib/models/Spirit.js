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
static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM spirits WHERE id=$1', [id]
    );
    if(!rows[0]) return null;
    return new Spirit(rows[0]);
  }
  static async updateById(id, updatedSpirit) {
    const result = await pool.query('SELECT * FROM spirits WHERE id=$1', [
      id
    ]);
    const existingSpirit = result.rows[0];
  
    if (!existingSpirit) {
      const error = new Error(`Spirit ${id} not found`);
      error.status = 404;
      throw error;
    }
    const newCategory = updatedSpirit.category ?? existingSpirit.category;
    const newBrand = updatedSpirit.brand ?? existingSpirit.brand;
    const newStocked = updatedSpirit.stocked ?? existingSpirit.stocked;

    const { rows } = await pool.query(
      'UPDATE spirits SET category=$2, brand=$3, stocked=$4 WHERE id=$1 RETURNING *;',
      [id, newCategory, newBrand, newStocked]
    );
    return new Spirit(rows[0]);
  }
};
