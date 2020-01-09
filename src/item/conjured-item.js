const Item = require('./item');

class ConjuredItem extends Item {
  update() {
    this.sellIn -= 1;
    this.quality = Math.max(0, this.sellIn > 0 ? this.quality - 2 : this.quality - 4);
  }
}

module.exports = ConjuredItem;
