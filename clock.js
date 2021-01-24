const clockContainer = document.querySelector(".js-clock");
const clockTitle = document.querySelector("h1");

function getTime() {
    const date = new Date();
    const minute = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    // clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minute < 10 ? `0${minute}` : minute}:${seconds <10 ? `0${seconds}` : seconds}`;
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minute < 10 ? `0${minute}` : minute}`;

}

function init() {
    getTime();
    setInterval(getTime, 1000);
}
init();