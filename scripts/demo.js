'use strict';

var productName = ['item1', 'item2', 'item3'];
var allProducts = [];
var totalClicks = 0;

function Product() {
  this.imageURL = '../img/' + name + '.jpg';
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

function createProducts() {
  for (var i = 0; i < productName.length; i++) {
    new Product(productName[i]);
  }
}

function render() {
  var productSection = document.getElementById('products');
  for (var i = 0; i < productName.length; i++) {
    var img = document.createElement('img');
    img.setAttribute('src', allProducts.imageURL);
    img.setAttribute('data-name', allProducts[i].name);
    img.addEventListener('click', handleVote);
    productSection.appendChild(img);
  }
}

function handleVote() {
  var product = event.target.dataset.name;
  for (var i = 0; i < 2; i++) {
    if (allProducts[i].name === productName) {
      allProducts[i].clicks++;
      totalClicks++;
    }
  }
  if (totalClicks === 25) {
    var imgs = document.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].removeEventListener('click');
    }
  }
}

createProducts();
render();


