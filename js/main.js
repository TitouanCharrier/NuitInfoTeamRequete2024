"use strict";
console.log("Hello World!");
let headBtn = null;
let chestBtn = null;
let lLegBtn = null;
let rLegBtn = null;
let rArmBtn = null;
let lArmBtn = null;
let lungTxt = null;
let heartTxt = null;
document.addEventListener("DOMContentLoaded", () => {
    headBtn = document.getElementById('headBtn');
    chestBtn = document.getElementById('chestBtn');
    rLegBtn = document.getElementById('rLegBtn');
    lLegBtn = document.getElementById('lLegBtn');
    rArmBtn = document.getElementById('rArmBtn');
    lArmBtn = document.getElementById('lArmBtn');
    heartTxt = document.getElementById('heartTxt');
    lungTxt = document.getElementById('lungTxt');
    heartTxt.disabled = true;
    lungTxt.disabled = true;
    heartTxt.style.display = "none";
    lungTxt.style.display = "none";
});
function displaybody(button) {
    switch (button) {
        case "heart":
            console.log("heart");
            heartTxt.style.display = "flex";
            break;
        case "lung":
            console.log("lung");
            lungTxt.style.display = "flex";
            break;
        default:
            break;
    }
}
function hidebody(button) {
    switch (button) {
        case "heart":
            console.log("heart");
            heartTxt.style.display = "none";
            break;
        case "lung":
            console.log("lung");
            lungTxt.style.display = "none";
            break;
        default:
            break;
    }
}
