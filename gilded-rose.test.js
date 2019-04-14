const { Shop, Item } = require('./gilded-rose.js');

describe('Gilded Rose', () => {
  test('should store Items', () => {
    const gildedRose = new Shop([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual('foo');
  });
});
