function fiveDays(data) {
  const dayMilsec = 24 * 60 * 60 * 1000;
  let today = new Date().getTime();

  for (let i = 0; i < 5; i++) {
    let date = new Date(today + dayMilsec * i);
    let tempMinMax = [];
    let iconWeather;
    let typeWeather = [];
    
    transformArray();
    typeWeatherValue();
    iconWeatherValue();
    createListFiveWeather();

    function transformArray() {
      const getDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      const getMonth = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
      const dailyData = data.list.filter((reading) => reading.dt_txt.includes(`${date.getFullYear()}-${getMonth}-${getDate}`));

      dailyData.forEach((element) => {
        typeWeather.push([element.weather[0].description, element.weather[0].icon]);
        tempMinMax.push(element.main.temp);
        tempMinMax.sort((a, b) => {
          return a - b;
        })
      });
    }

    function iconWeatherValue() {
      typeWeather.forEach((element) => {
        if (element.includes(textOfFiveDayValue[0])) {
          iconWeather = element[1];
        }
      });
    }

    function typeWeatherValue() {
      const resultOftypeWeather = {};
      typeWeather.forEach((element) => {
        resultOftypeWeather[element[0]] = resultOftypeWeather[element[0]] + 1 || 1;
      });
      textValue = Object.entries(resultOftypeWeather).sort((a, b) => {
        return b[1] - a[1];
      });
      textOfFiveDayValue = textValue[0];
      return textOfFiveDayValue
    }

    function createListFiveWeather() {
      listFiveWeather.innerHTML += 
      `<div class="listFiveWeather_date">
        <div class="listFiveWeatherWrapper">
          <div class="listFiveWeather_day">
            <h2 class="weekDay">${date.toString().substr(0, 3)}</h2>
          </div>
          <img src="http://openweathermap.org/img/wn/${iconWeather.replace('n', 'd')}@2x.png" alt="${iconWeather}">
          <div class="listFiveWeatherFont">
            <p class="mb-1">${textOfFiveDayValue[0].split(',')[0].split('.').map((element) => (textOfFiveDayValue[0].replace(element[0], element[0].split(',')[0].toUpperCase()))).join('')}</p>
          </div>
          <div class="listFiveWeather_temp">
            <p class="temp_week">${Math.round(tempMinMax[tempMinMax.length - 1])}° | ${Math.round(tempMinMax[0])}° </p>
          </div>
        </div>          
      </div>`;
    }
  }
}