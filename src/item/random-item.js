const Item = require('./item');

module.exports = class RandomItem extends Item {
  update() {
    this.sellIn -= 1;
    if (this.quality !== 0) {
      this.quality = this.sellIn > 0 ? this.quality - 1 : this.quality - 2;
    }
  }
};
