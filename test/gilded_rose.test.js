const { Shop, Item } = require("../src/gilded_rose");

describe("Random Item", () => {
  test("should degrade a random Item", () => {
    const GildedRose = new Shop([new Item("foo", 5, 5)]);
    const item = GildedRose.updateQuality().pop();
    expect(item.quality).toEqual(4);
  });

  test("should decrease quality of Item by 2 when after expiry", () => {
    const GildedRose = new Shop([new Item("foo", 0, 5)]);
    const item = GildedRose.updateQuality().pop();
    expect(item.quality).toEqual(3);
  });

  test("should not degrade Item quality when quality is 0", () => {
    const GildedRose = new Shop([new Item("foo", 0, 0)]);
    const item = GildedRose.updateQuality().pop();    
    expect(item.quality).toEqual(0);
  });

  test("should not degrade Hand of Rag", () => {
    const GildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 0)]);
    const item = GildedRose.updateQuality().pop();
    expect(item.quality).toEqual(80);
  });
});

describe("Aged Brie", () => {
  test("should increase Aged Brie quality", () => {
    const GildedRose = new Shop([new Item("Aged Brie", 3, 1)]);
    const item = GildedRose.updateQuality().pop();
    expect(item.quality).toEqual(2);
  });

  test("should increase Aged Brie quality 2x when expiry is passed", () => {
    const GildedRose = new Shop([new Item("Aged Brie", 0, 2)]);
    const item = GildedRose.updateQuality().pop();
    expect(item.quality).toEqual(4);
  });
});

describe("Backstage passes to a TAFKAL80ETC concert", () => {
  test("should increase Backstage Pass quality by 1x for more than 10 days", () => {
    const GildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 20, 10),
    ]);
    const item = GildedRose.updateQuality().pop();
    expect(item.quality).toEqual(11);
  });

  test("should increase Backstage Pass quality by 2x, 10 days before expiry", () => {
    const GildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 11),
    ]);
    const item = GildedRose.updateQuality().pop();
    expect(item.quality).toEqual(13);
  });

  test("should increase Backstage Pass quality by 3x, 5 days before expiry", () => {
    const GildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
    ]);
    const item = GildedRose.updateQuality().pop();
    expect(item.quality).toEqual(23);
  });
});

describe("Conjured", () => {
  test("should decrease Conjured Items quality 2x", () => {
    const GildedRose = new Shop([new Item("Conjured", 5, 10, true)]);
    const item = GildedRose.updateQuality().pop();
    expect(item.quality).toEqual(8);
  });

  test("should decrease Conjured items ex even after expiry", () => {
    const GildedRose = new Shop([new Item("Conjured", 0, 10)]);
    const item = GildedRose.updateQuality().pop();
    expect(item.quality).toEqual(6);
  });
});
