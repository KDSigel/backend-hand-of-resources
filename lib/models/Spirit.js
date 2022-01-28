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
