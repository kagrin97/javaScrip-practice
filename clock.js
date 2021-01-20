const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");


function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = 
    `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
} // ${hours < 10 ? `0${hours}` : hours}  <-- 만약 시간이 10보다 작으면 앞에0을붙이고 출력하고 아니라면 그냥 출력

function init() {
    getTime();
    setInterval(getTime, 1000);
    // setInterval(실행할 함수, 1000밀리세컨드==1초) <-- 1초마다 getTime 함수를 실행함
}

init();