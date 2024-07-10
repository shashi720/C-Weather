/* 
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates and open the template in the editor.
    Created on : Jul 16, 2021, 08:14:32 PM
    Author     : Chiranjeev 
 * Reffrence from w3school, openweathermap.org for apiID, 
 */

let appId = '4d8fb5b93d4af21d66a2948710284366';
let units = 'metric'; 
let searchMethod; 

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else 
        searchMethod = 'q'; // q means searching as a string.
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            init(res);
    });
}

function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = "url('clearPicture.jpg')";
            break;
        
        case 'Clouds':
            document.body.style.backgroundImage = "url('cloudyPicture.jpg')";
            break;

        case 'Rain':
        case 'Drizzle':
            document.body.style.backgroundImage = "url('rainPicture.jpg')";
            break;

        case 'Mist':
            document.body.style.backgroundImage = "url('mistPicture.jpg')";
            break;    
        
        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('stormPicture.jpg')";
            break;
        
        case 'Snow':
            document.body.style.backgroundImage = "url('snowPicture.jpg')";
            break;

        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('cweadesheader');
    let temperatureElement = document.getElementById('temp');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('ccityheader');

    let weatherIcon = document.getElementById('documentIconImg');
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;C';
    windSpeedElement.innerHTML = 'Wind Speed: ' + Math.floor(resultFromServer.wind.speed) + ' Km/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels: ' + resultFromServer.main.humidity +  '%&#9748;';

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    let cweacont = document.getElementById('cweacont');
    let cweacontHeight = cweacont.clientHeight;
    let cweacontWidth = cweacont.clientWidth;

    cweacont.style.left = `calc(50% - ${cweacontWidth/2}px)`;
    cweacont.style.top = `calc(50% - ${cweacontHeight/1.3}px)`;
    cweacont.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
});

