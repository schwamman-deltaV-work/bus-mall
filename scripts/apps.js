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
  ],
];
var productObjects = [];
var totalClicks = 0;
var displayNumber = 3;
var lastShown = [];
var votesArray = [];
var viewsArray = [];

function Product() {
  this.imageURL = '../imgs/';
  this.name = '';
  this.description = '';
  this.clicks = 0;
  this.views = 0;
  productObjects.push(this);
}

function createProducts() {
  for (var i = 0; i < products[0].length; i++) {
    new Product(products[[0][i]]);
    productObjects[i].name = products[0][i];
    productObjects[i].imageURL += products[1][i];
    productObjects[i].description = products[2][i];
  }
}

function calcPercentage(clicks, views) {
  var percentage = Math.round(views / clicks * 100);
  if (isNaN(percentage)) {
    percentage = '';
  }
  else if (percentage === Infinity) {
    percentage = '';
  }
  else {
    percentage = '(' + percentage + '%)';
  }
  return percentage;
}

function randomProduct() {
  return Math.floor(Math.random() * productObjects.length);
}

function render() {
  var productsLocation = document.getElementById('products');
  productsLocation.innerHTML = '';

  var randomProducts = [];

  if (displayNumber >= productObjects.length / 2) {
    displayNumber = productObjects.length / 2;
  }
  for (var i = 0; i < displayNumber; i++) {
    var product = randomProduct();
    while (randomProducts.includes(product) || lastShown.includes(product)) {
      product = randomProduct();
    }
    randomProducts.push(product);
    
  }

  lastShown = randomProducts;

  for (var i = 0; i < displayNumber; i++) {
    productObjects[randomProducts[i]].views++;
    var imageContainer = document.createElement('div');
    imageContainer.setAttribute('class', 'image ' + productObjects[randomProducts[i]].name);
    imageContainer.setAttribute('data-name', productObjects[randomProducts[i]].name);
    imageContainer.addEventListener('click', voting);
    productsLocation.appendChild(imageContainer);
  }
}

function voting(event) {
  var clickedProduct = event.target.dataset.name;
  for (var i = 0; i < productObjects.length; i++) {
    if (productObjects[i].name === clickedProduct) {
      productObjects[i].clicks++;
      totalClicks++;
      render();
    }
  }
  if(totalClicks === 25){
    var images = document.getElementsByClassName('image');
    for(var i = 0; i < images.length; i++){
      images[i].removeEventListener('click', voting);
    }
    generateResults();
    generateGraph();
    saveData();
  }
}

function generateResults() {
  var resultsLocation = document.getElementById('results');
  var resultsList = document.createElement('ul');
  for (var i = 0; i < productObjects.length; i++) {
    var productResults = document.createElement('li');
    productResults.textContent = productObjects[i].description + ' : ' + (productObjects[i].clicks + votesArray[i]) + ' / ' + (productObjects[i].views + viewsArray[i]) + ' ' + calcPercentage((productObjects[i].views + viewsArray[i]), (productObjects[i].clicks + votesArray[i]));
    resultsList.appendChild(productResults);
  }
  resultsLocation.appendChild(resultsList);

}

function generateGraph() {
  var graphLocation = document.getElementById('products');
  for (var j = 0; j < displayNumber; j++) {
    graphLocation.removeChild(graphLocation.childNodes[0]);
  }
  var graph = document.createElement('canvas');
  graph.setAttribute('id', 'myChart');
  graphLocation.appendChild(graph);

  for (var i = 0; i < productObjects.length; i++) {
    votesArray[i] = productObjects[i].clicks + parseInt(votesArray);
    viewsArray[i] = productObjects[i].views + parseInt(viewsArray);
  }

  var percentageArray = [];
  for (var i = 0; i < productObjects.length; i++) {
    var percent = Math.round(votesArray[i] / viewsArray[i] * 100);
    percentageArray.push(percent);
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  Chart.defaults.global.defaultFontSize = 16;
  var chart = new Chart(ctx, {
    type: 'bar',

    data: {
      labels: products[2],
      datasets: [{
        label: 'Vote Totals',
        backgroundColor: '#101357',
        hoverBackgroundColor: 'hsla(237, 69%, 20%, 0.53)',
        data: votesArray,
        yAxisID: 'A',
      },
      {
        label: 'Votes / Views %',
        backgroundColor: '#226917',
        yAxisID: 'B',
        hoverBackgroundColor: 'hsla(112, 64%, 25%, 0.53)',
        data: percentageArray,
      }]
    },

    options: {
      layout: {
        padding: {
          left: 25,
          right: 50,
          top: 100,
          bottom: 0
        }
      },
      scales: {
        yAxes: [{
          id: 'A',
          type: 'linear',
          position: 'left',
          ticks: {
            max: 10,
            min: 0,
            stepSize: 1,
            fontSize: 16,
          },
          
        },
        { id: 'B',
          type: 'linear',
          position: 'right',
          ticks: {
            max: 100,
            min: 0,
            fontSize: 16,
            callback: function(value, index, values) {
              return value + '%';
            },
          },
        }],
      },
    },
  });
}

function loadData() {
  if (localStorage.getItem("votes") === null) {
    console.log('In if statement')
    createStorageArrays();
    localStorage.setItem('votes', JSON.stringify(votesArray));
    localStorage.setItem('views', JSON.stringify(viewsArray));
  }
  votesArray = JSON.parse(localStorage.getItem('votes'));
  viewsArray = JSON.parse(localStorage.getItem('views'));
}

function saveData() {
  localStorage.setItem('votes', JSON.stringify(votesArray));
  localStorage.setItem('views', JSON.stringify(viewsArray));
}

function createStorageArrays() {
  for (var i = 0; i < productObjects.length; i++) {
    votesArray.push(0);
  }
  for (var i = 0; i < productObjects.length; i++) {
    viewsArray.push(0);
  }
}

createProducts();
loadData();

render();


console.log(localStorage);


