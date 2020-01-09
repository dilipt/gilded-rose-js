const { Shop } = require('./gilded-rose');
const { Item } = require('./item');

const Specials = {
  Brie: 'Aged Brie',
  Pass: 'Backstage passes to a TAFKAL80ETC concert',
  Lego: 'Sulfuras, Hand of Ragnaros',
};

describe('Gilded Rose', () => {
  test('should degrade a random Item', () => {
    const gildedRose = new Shop([new Item('foo', 5, 5)]);
    const items = gildedRose.updateQuality();
    const fooItem = items.shift();
    expect(fooItem.name).toEqual('foo');
    expect(fooItem.sellIn).toEqual(4);
    expect(fooItem.quality).toEqual(4);
  });

  test('should decrease quality of Item by 2 when past use-by date', () => {
    const GildedRose = new Shop([new Item('foo', 0, 5)]);
    const items = GildedRose.updateQuality();
    const item = items.shift();
    expect(item.quality).toEqual(3);
    expect(item.sellIn).toEqual(-1);
  });

  test('should not degrade Item quality below zero', () => {
    const gildedRose = new Shop([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    const fooItem = items.shift();
    expect(fooItem.name).toEqual('foo');
    expect(fooItem.sellIn).toEqual(-1);
    expect(fooItem.quality).toEqual(0);
  });

  test('should not degrade Hand of Rag', () => {
    const GildedRose = new Shop([new Item(Specials.Lego, 0, 0)]);
    const items = GildedRose.updateQuality();
    expect(items[0].quality).toEqual(80);
  });

  test('should increase Aged Brie quality', () => {
    const GildedRose = new Shop([new Item(Specials.Brie, 3, 1)]);
    const items = GildedRose.updateQuality();
    const brie = items.shift();
    expect(brie.sellIn).toEqual(2);
    expect(brie.quality).toEqual(2);
  });

  test('should increase Aged Brie quality twofold when past use-by date', () => {
    const GildedRose = new Shop([new Item(Specials.Brie, 0, 2)]);
    const items = GildedRose.updateQuality();
    const brie = items.shift();
    expect(brie.sellIn).toEqual(-1);
    expect(brie.quality).toEqual(4);
  });

  test('should increase Backstage Pass quality by default', () => {
    const GildedRose = new Shop([new Item(Specials.Pass, 20, 10)]);
    const items = GildedRose.updateQuality();
    const item = items.shift();
    expect(item.sellIn).toEqual(19);
    expect(item.quality).toEqual(11);
  });

  test('should increase Backstage Pass quality by 2 within 10 days', () => {
    const GildedRose = new Shop([new Item(Specials.Pass, 10, 11)]);
    const items = GildedRose.updateQuality();
    const pass = items.shift();
    expect(pass.sellIn).toEqual(9);
    expect(pass.quality).toEqual(13);
  });

  test('should increase Backstage Pass quality by 3 within 5 days', () => {
    const GildedRose = new Shop([new Item(Specials.Pass, 5, 20)]);
    const items = GildedRose.updateQuality();
    const pass = items.shift();
    expect(pass.sellIn).toEqual(4);
    expect(pass.quality).toEqual(23);
  });

  test('should decrease Conjured Items quality twice as quickly', () => {
    const GildedRose = new Shop([new Item('Conjured Item', 5, 10, true)]);
    const items = GildedRose.updateQuality();
    const cake = items.shift();
    expect(cake.quality).toEqual(8);
    expect(cake.sellIn).toEqual(4);
  });

  test('should decrease Conjured items even further in quality after use-by date', () => {
    const GildedRose = new Shop([new Item('Conjured Item', 0, 10)]);
    const items = GildedRose.updateQuality();
    const mana = items.shift();
    expect(mana.sellIn).toEqual(-1);
    expect(mana.quality).toEqual(6);
  });

  test('should handle more than one item', () => {
    const GildedRose = new Shop([
      new Item('Conjured Item', 5, 10),
      new Item(Specials.Brie, 5, 5),
    ]);

    const items = GildedRose.updateQuality();

    expect(items.length).toEqual(2);

    expect(items[0].quality).toEqual(8);
    expect(items[0].sellIn).toEqual(4);
    expect(items[1].quality).toEqual(6);
    expect(items[1].sellIn).toEqual(4);
  });
});
