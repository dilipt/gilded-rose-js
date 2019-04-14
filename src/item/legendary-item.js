const Item = require('./item');

module.exports = class LegendaryItem extends Item {
  constructor(name = 'Sulfuras, Hand of Ragnaros') {
    super(name, 0, 80);
  }

  update() {
    this.sellIn -= 1;
  }
};
