const pool = require('../utils/pool');

module.exports = class Art {
  id;
  title;
  theme;
  medium;
  worth;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.theme = row.theme;
    this.medium = row.medium;
    this.worth = row.worth;
  }

  static async insert({ title, theme, medium, worth }) {
    const { rows } = await pool.query(
      'INSERT INTO art(title, theme, medium, worth) VALUES ($1, $2, $3, $4) RETURNING * ',
      [title, theme, medium, worth]
    );
    return new Art(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from art');
    return rows.map((row) => new Art(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM art WHERE id=$1', [id]
    );
    if(!rows[0]) return null;
    return new Art(rows[0]);
  }

  static async updateById(id, newArt) {
    const result = await pool.query('SELECT * FROM art WHERE id=$1', [
      id
    ]);
    const existingArt = result.rows[0];
  
    if (!existingArt) {
      const error = new Error(`Art ${id} not found`);
      error.status = 404;
      throw error;
    }
    const newTitle = newArt.title ?? existingArt.title;
    const newTheme = newArt.theme ?? existingArt.theme;
    const newMedium = newArt.medium ?? existingArt.medium;
    const newWorth = newArt.worth ?? existingArt.worth;

    const { rows } = await pool.query(
      'UPDATE art SET title=$2, theme=$3, medium=$4, worth=$5 WHERE id=$1 RETURNING *;',
      [id, newTitle, newTheme, newMedium, newWorth]
    );
    return new Art(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM art WHERE id=$1 RETURNING *;', [id]
    );
    if(!rows[0]) return null;
    return new Art(rows[0]);
  }

};
