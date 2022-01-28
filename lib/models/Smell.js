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

};
