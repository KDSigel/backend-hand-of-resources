const pool = require('../utils/pool');

module.exports = class Myth {
  id;
  title;
  pervasiveness;
  believability;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.pervasiveness = row.pervasiveness;
    this.believability = row.believability;
  }

  static async insert({ title, pervasiveness, believability }) {
    const { rows } = await pool.query(
      'INSERT INTO myths (title, pervasiveness, believability ) VALUES ($1, $2, $3) RETURNING * ',
      [title, pervasiveness, believability]
    );
    return new Myth(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from myths');
    return rows.map((row) => new Myth(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM myths WHERE id=$1', [id]
    );
    if(!rows[0]) return null;
    return new Myth(rows[0]);
  }

};
