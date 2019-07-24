"use strict";

window.onload = loadData;

function loadData() {
  if (localStorage) {
    for (var i = 0; i < productObjects.length; i++) {}
  }
}

function saveData() {
  if (localStorage) {
    for (var i = 0; i < productObjects.length; i++) {
        localStorage.setItem("votes", "Smith");
    }
  }
}

function createStorageArrays {
    for (var i = 0; i < productObjects.length; i++) {
        votesArray.push(productObjects[i].clicks);
        }
        for (var i = 0; i < productObjects.length; i++) {
        viewsArray.push(productObjects[i].views);
        }
}
