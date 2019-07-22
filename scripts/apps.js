'use strict';

var products = [
    ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dogDuck', 'dragon', 'pen', 'petSweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'waterCan', 'wineGlass'], 
    ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg' ],
    ['R2D2 Bag', 'Banana Slicer', 'Bathroom Stand', 'Rain Boots', 'Breakfast All-in-One', 'Meatball Bubblegum', 'Chair', 'Cthulhu', 'Dog Duck Nose', 'Dragon Meat', 'Utencil Pens', 'Pet Sweep', 'Pizza Scissors', 'Shark Sleeping Bag', 'Baby Sweeper', 'Tauntaun Sleeping Bag', 'Unicorn Meat', 'USB Tentacle', 'Watering Can', 'Wine Glass']
];
var productObjects = [];
var totalClicks = 0;

function Product() {
    this.imageURL = '';
    this.name = '';
    this.clicks = 0;
    this.views = 0;
    productObjects.push(this);
}

function createProducts() {
    for (var i = 0; i < products[0].length; i++) {
        new Product(products[[0][i]]);
        productObjects[i].imageURL = products[1][i];
        productObjects[i].name = products[2][i];
    }

}

createProducts();

console.table(productObjects);





