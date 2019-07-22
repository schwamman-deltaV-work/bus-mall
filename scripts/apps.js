'use strict';

var products = [
  [
    'bag',
    'banana',
    'bathroom',
    'boots',
    'breakfast',
    'bubblegum',
    'chair',
    'cthulhu',
    'dogDuck',
    'dragon',
    'pen',
    'petSweep',
    'scissors',
    'shark',
    'sweep',
    'tauntaun',
    'unicorn',
    'usb',
    'waterCan',
    'wineGlass'
  ],
  [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg'
  ],
  [
    'R2D2 Bag',
    'Banana Slicer',
    'Bathroom Stand',
    'Rain Boots',
    'Breakfast All-in-One',
    'Meatball Bubblegum',
    'Chair',
    'Cthulhu',
    'Dog Duck Nose',
    'Dragon Meat',
    'Utencil Pens',
    'Pet Sweep',
    'Pizza Scissors',
    'Shark Sleeping Bag',
    'Baby Sweeper',
    'Tauntaun Sleeping Bag',
    'Unicorn Meat',
    'USB Tentacle',
    'Watering Can',
    'Wine Glass'
  ]
];
var productObjects = [];
var totalClicks = 0;
var displayNumber = 3;

function Product() {
  this.imageURL = '../imgs/';
  this.name = '';
  this.clicks = 0;
  this.views = 0;
  productObjects.push(this);
}

function createProducts() {
  for (var i = 0; i < products[0].length; i++) {
    new Product(products[[0][i]]);
    productObjects[i].imageURL += products[1][i];
    productObjects[i].name = products[2][i];
  }
}

function randomProduct() {
  return Math.floor(Math.random() * productObjects.length);
}

function render() {
  var productsLocation = document.getElementById('products');
  productsLocation.innerHTML = '';

  var randomProducts = [];
  randomProducts.push(randomProduct());
  for (var i = 1; i < displayNumber; i++) {
    randomProducts.push(randomProduct());
    for (var j = 0; j < i; j++) {
      while (randomProducts[j] === randomProducts[j + 1]) {
        randomProducts[j + 1] = randomProduct();
      }  
      for (var k = 0; k < j; k++) {
        while (randomProducts[k] === randomProducts[k + 2]) {
        randomProducts[k + 2] = randomProduct();
        }
      }
    }
  }
  

console.table(productObjects);

  for (var i = 0; i < displayNumber; i++) {
    productObjects[randomProducts[i]].views++;
    var img = document.createElement('img');
    img.setAttribute('src', productObjects[randomProducts[i]].imageURL);
    img.setAttribute('data-name', productObjects[randomProducts[i]].name);
    // img.addEventListener('click', handleVote);
    productsLocation.appendChild(img);
  }
}

createProducts();

render();


