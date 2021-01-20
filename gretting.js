const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";


function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault(); //이벤트가 발생해도 아무일이 일어나지 않기떄문에 이벤트를 디폴트값을없앰
  const currentValue = input.value; // 인풋에 입력한 값을 currentValue에 저장 
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener('submit', handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN); // 목록에 문자열 삭제
  greeting.classList.add(SHOWING_CN); //문자열 추가
  greeting.innerText = `Hello ${text}`;  
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName(); // 유저값에 아무것도없으면 askForName을 실행
  } else {
    paintGreeting(currentUser); // 있을 경우 paintGreeting를 실행
  }
}

function init() {
  loadName();
}

init();