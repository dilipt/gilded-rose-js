const {
  AgedBrie,
  RandomItem,
  BackstagePass,
  LegendaryItem,
  ConjuredItem,
} = require('./item');

class Shop {
  constructor(items = []) {
    this.items = items.map((item) => {
      switch (item.name) {
        case 'Sulfuras, Hand of Ragnaros': return new LegendaryItem();
        case 'Aged Brie': return new AgedBrie(item.sellIn, item.quality);
        case 'Backstage passes to a TAFKAL80ETC concert': return new BackstagePass(item.sellIn, item.quality);
        case 'Conjured Item': return new ConjuredItem(item.name, item.sellIn, item.quality);
        default: return new RandomItem(item.name, item.sellIn, item.quality);
      }
    });
  }

  updateQuality() {
    this.items.forEach((item) => item.update());
    return this.items;
  }
}

module.exports = {
  Shop,
};
