const API_KEY = 'eac99c860e37d1fb4ed44625298afec4';
const cityBase = {city: 'Minsk'};

const requestValues = localStorage.getItem('requests') ? JSON.parse(localStorage.getItem('requests')) : [];
const form = document.querySelector('.forma');
const input = document.querySelector('.inputSearchCity');
const listFiveWeather = document.querySelector('.listFiveWeather');
const requestList = document.querySelector('.requestList');
const temp = document.querySelector('.temp');
const city = document.querySelector('.city');
const weatherType = document.querySelector('.weatherType');
const iconWeather = document.querySelector('.iconWeather');
const pressure = document.querySelector('.pressure');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind');
const dayToday = document.querySelector('.day');
const dateToday = document.querySelector('.date');
const time = document.querySelector('.time');

async function startApp() {
  try {
    const result = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityBase.city}&appid=${API_KEY}&units=metric`);
    const data = await result.json();

    function currentlyWeatherCreate(data) {
      temp.innerHTML = `${Math.round(data.list[0].main.temp)}°`;
      pressure.innerHTML = `${data.list[0].main.pressure}mbar`;
      humidity.innerHTML = `${data.list[0].main.humidity}%`;
      windSpeed.innerHTML = `${(data.list[0].wind.speed.toFixed(1))} meters / sec`;
      city.innerHTML = `${data.city.name}`;
    
      for (const elem of data.list[0].weather) {
        weatherType.innerHTML = elem.description.split('.')
          .map((descr) => (descr.replace(descr[0], descr[0].toUpperCase())))
          .join('');
        iconWeather.setAttribute('src', `http://openweathermap.org/img/wn/${elem.icon.replace('n', 'd')}@2x.png`);
        weatherType.append(iconWeather);
      }
    }

    currentlyWeatherCreate(data);
    fiveDays(data);
    deleteRequest();
    createLastRequest();
    eventSearch();
    getTime();
    getDateToday();
    getDayToday();
    
  } catch (error) {
    console.log(error);
  }
};

startApp();
