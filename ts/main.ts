console.log("Hello World!");


let headBtn:any = null;
let chestBtn:any = null;
let lLegBtn:any = null;
let rLegBtn:any = null;
let rArmBtn:any = null;
let lArmBtn:any = null;    
let lungTxt:any = null;
let heartTxt:any = null;

document.addEventListener("DOMContentLoaded", () => {

    headBtn = document.getElementById('headBtn') as HTMLInputElement;
    chestBtn = document.getElementById('chestBtn') as HTMLInputElement;
    rLegBtn = document.getElementById('rLegBtn') as HTMLInputElement;
    lLegBtn = document.getElementById('lLegBtn') as HTMLInputElement;
    rArmBtn = document.getElementById('rArmBtn') as HTMLInputElement;
    lArmBtn = document.getElementById('lArmBtn') as HTMLInputElement;
    heartTxt = document.getElementById('heartTxt') as HTMLInputElement;
    lungTxt = document.getElementById('lungTxt') as HTMLInputElement;
    

});

function displaybody(button:string) {
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

function hidebody(button:string) {
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


