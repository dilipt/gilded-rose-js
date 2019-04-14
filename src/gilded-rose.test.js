const { Shop } = require('./gilded-rose');
const {
  RandomItem, LegendaryItem, AgedBrie, BackstagePass, ConjuredItem,
} = require('./item');

describe('Gilded Rose', () => {
  test('should degrade a random Item', () => {
    const gildedRose = new Shop([new RandomItem('foo', 5, 5)]);
    const items = gildedRose.updateQuality();
    const fooItem = items.shift();
    expect(fooItem.name).toEqual('foo');
    expect(fooItem.sellIn).toEqual(4);
    expect(fooItem.quality).toEqual(4);
  });

  test('should not degrade Item quality below zero', () => {
    const gildedRose = new Shop([new RandomItem('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    const fooItem = items.shift();
    expect(fooItem.name).toEqual('foo');
    expect(fooItem.sellIn).toEqual(-1);
    expect(fooItem.quality).toEqual(0);
  });

  test('should not degrade Hand of Rag', () => {
    const GildedRose = new Shop([new LegendaryItem()]);
    const items = GildedRose.updateQuality();
    expect(items[0].quality).toEqual(80);
  });

  test('should increase quality of Aged Brie', () => {
    const GildedRose = new Shop([new AgedBrie(3, 1)]);
    const items = GildedRose.updateQuality();
    const brie = items.shift();
    expect(brie.sellIn).toEqual(2);
    expect(brie.quality).toEqual(2);
  });

  test('should decrease quality of Item by 2 when past use-by date', () => {
    const GildedRose = new Shop([new RandomItem('foo', 0, 5)]);
    const items = GildedRose.updateQuality();
    const item = items.shift();
    expect(item.quality).toEqual(3);
    expect(item.sellIn).toEqual(-1);
  });

  test('Backstage Pass should increase in quality by default', () => {
    const GildedRose = new Shop([new BackstagePass(20, 10)]);
    const items = GildedRose.updateQuality();
    const item = items.shift();
    expect(item.sellIn).toEqual(19);
    expect(item.quality).toEqual(11);
  });

  test('Backstage Pass should increase quality by 2 within 10 days', () => {
    const GildedRose = new Shop([new BackstagePass(10, 11)]);
    const items = GildedRose.updateQuality();
    const pass = items.shift();
    expect(pass.sellIn).toEqual(9);
    expect(pass.quality).toEqual(13);
  });

  test('Backstage Pass should increase quality by 3 within 5 days', () => {
    const GildedRose = new Shop([new BackstagePass(5, 20)]);
    const items = GildedRose.updateQuality();
    const pass = items.shift();
    expect(pass.sellIn).toEqual(4);
    expect(pass.quality).toEqual(23);
  });

  test('Conjured Items decrease in quality twice as quickly', () => {
    const GildedRose = new Shop([new ConjuredItem('mana cakes', 5, 10)]);
    const items = GildedRose.updateQuality();
    const cake = items.shift();
    expect(cake.quality).toEqual(8);
    expect(cake.sellIn).toEqual(4);
  });

  test('Conjured items decrease even further in quality after use-by date', () => {
    const GildedRose = new Shop([new ConjuredItem('mana', 0, 10)]);
    const items = GildedRose.updateQuality();
    const mana = items.shift();
    expect(mana.sellIn).toEqual(-1);
    expect(mana.quality).toEqual(6);
  });
});
