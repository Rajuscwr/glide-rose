class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  
  increaseQuality(val, count = 1) {
    return val === 50 ? val : val + count;
  }

  decreaseQuality(val, count = 1) {
    const result = val - count > 0 ? val - count : 0;
    return val === 0 ? val : result;
  }
  updateQuality() {
    this.items.forEach((item) => {      
      switch (item.name) {
        case "Aged Brie": {
          item.quality = this.increaseQuality(
            item.quality,
            item.sellIn ? 1 : 2
          );
          
          break;
        }

        case "Conjured": {
          item.quality = this.decreaseQuality(
            item.quality,
            item.sellIn ? 2 : 4
          );
          break;
        }
        
        case "Sulfuras, Hand of Ragnaros": {
          item.quality = 80;
          break;
        }

        case "Backstage passes to a TAFKAL80ETC concert": {
          let qualityIncrement = 1;
          if (item.sellIn <= 10) {
            qualityIncrement = 2;
          }
          if (item.sellIn <= 5) {
            qualityIncrement = 3;
          }

          item.quality =
            item.sellIn === 0
              ? 0
              : this.increaseQuality(item.quality, qualityIncrement);
          item.sellIn--;
          break;
        }

        default: {
          item.quality = this.decreaseQuality(
            item.quality,
            item.sellIn ? 1 : 2
          );
          item.sellIn--;
          break;
        }
      }
      item.sellIn--;
    });

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
