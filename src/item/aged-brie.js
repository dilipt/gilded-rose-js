const Item = require('./item');

module.exports = class AgedBrie extends Item {
  constructor(sellIn, quality) {
    super('Aged Brie', sellIn, quality);
  }

  update() {
    this.sellIn -= 1;
    this.quality = this.sellIn > 0 ? this.quality + 1 : this.quality + 2;
  }
};
