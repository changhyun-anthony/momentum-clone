const weather = document.querySelector('.js-weather');

const API_KEY ='60f1c93d331f8d6049fa47e1f8660ac8';
const COORDS = 'coords';

function getWeather (lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    }); 
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    // console.log(position.coords.latitude);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('cannot access')
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        //get weather
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}
init();