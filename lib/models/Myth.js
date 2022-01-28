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
};
