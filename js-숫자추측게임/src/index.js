// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const range = document.querySelector("#range"),
  rangeTitle = document.querySelector(".range__title"),
  inputNumber = document.querySelector("#inputNumber"),
  playBtn = document.querySelector(".playBtn"),
  choseSpan = document.querySelector(".choseSpan"),
  winOrLost = document.querySelector(".winOrLost");


function rangeTitleChange() {
  rangeTitle.innerText = `Generate a number between 0 and ${range.value}`;
}

function choseYou() {
  if(inputNumber.value) {
    const randomNumber = Math.floor(Math.random() * range.value);
    choseSpan.innerText = `You chose: ${inputNumber.value}, the machine chose: ${randomNumber}`;
  if(parseInt(inputNumber.value) ===  randomNumber) {
      winOrLost.innerText = "you won";
  } else {
      winOrLost.innerText = "you lost"
  }
 }
}


function init() {
  setInterval(rangeTitleChange, 1);
  playBtn.addEventListener("click", choseYou)
}

init();

