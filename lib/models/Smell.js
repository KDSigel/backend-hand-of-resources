const pool = require('../utils/pool');

module.exports = class Smell {
  id;
  title;
  strength;
  enjoyable;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.strength = row.strength;
    this.enjoyable = row.enjoyable;
  }

  static async insert({ title, strength, enjoyable }) {
    const { rows } = await pool.query(
      'INSERT INTO smells (title, strength, enjoyable ) VALUES ($1, $2, $3) RETURNING * ',
      [title, strength, enjoyable]
    );
    return new Smell(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from smells');
    return rows.map((row) => new Smell(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM smells WHERE id=$1', [id]
    );
    if(!rows[0]) return null;
    return new Smell(rows[0]);
  }

  static async updateById(id, newSmellInfo) {
    const result = await pool.query('SELECT * FROM smells WHERE id=$1', [
      id
    ]);
    const existingSmell = result.rows[0];
  
    if (!existingSmell) {
      const error = new Error(`Smell ${id} not found`);
      error.status = 404;
      throw error;
    }
    const newTitle = newSmellInfo.title ?? existingSmell.title;
    const newStrength = newSmellInfo.strength ?? existingSmell.strength;
    const newEnjoyable = newSmellInfo.enjoyable ?? existingSmell.enjoyable;

    const { rows } = await pool.query(
      'UPDATE smells SET title=$2, strength=$3, enjoyable=$4 WHERE id=$1 RETURNING *;',
      [id, newTitle, newStrength, newEnjoyable]
    );
    return new Smell(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM smells WHERE id=$1 RETURNING *', [id]
    );
    if(!rows[0]) return null;
    return new Smell(rows[0]);
  }

};
