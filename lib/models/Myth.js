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

  static async updateById(id, newMythInfo) {
    const result = await pool.query('SELECT * FROM myths WHERE id=$1', [
      id
    ]);
    const existingMyth = result.rows[0];
  
    if (!existingMyth) {
      const error = new Error(`Myth ${id} not found`);
      error.status = 404;
      throw error;
    }
    const newTitle = newMythInfo.title ?? existingMyth.title;
    const newPervasiveness = newMythInfo.pervasiveness ?? existingMyth.pervasiveness;
    const newBelievability = newMythInfo.believability ?? existingMyth.believability;

    const { rows } = await pool.query(
      'UPDATE myths SET title=$2, pervasiveness=$3, believability=$4 WHERE id=$1 RETURNING *;',
      [id, newTitle, newPervasiveness, newBelievability]
    );
    return new Myth(rows[0]);
  }

};
