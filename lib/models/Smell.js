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

};
