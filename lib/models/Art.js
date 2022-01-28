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
};
