let array = [];

function  valuesRequest() {
  if (!requestValues.includes(input.value.replace(input.value[0], input.value[0].toUpperCase()))) {
    requestValues.unshift(input.value.replace(input.value[0], input.value[0].toUpperCase()));
    localStorage.setItem('requests', JSON.stringify(requestValues));
  }
}

function deleteRequest() {
  const requestLastChild = document.querySelector('.requestList > div:last-child');
  for (let i = 0; i < requestValues.length; i++) {
    if (requestValues.length > 10) {
      requestList.removeChild(requestLastChild);
      array.length = 0;
      array.push(requestValues[requestValues.length - 1]);
      requestValues.splice(10, 1);
      localStorage.removeItem(requestValues[requestValues.length - 1]);
      localStorage.setItem('requests', JSON.stringify(requestValues));
      return requestList.insertAdjacentHTML('afterbegin',`<div class="requestElement offcanvas-header"> <p class="requestTitleElement"> ${requestValues[i]}</p> <button type="button" class='deleteButton btn-close'></button> </div>  `);
    }
  }
}

function deleteAllRequest() {
  localStorage.clear();
}
  
function createLastRequest() {
  requestList.innerHTML = '';
  if (localStorage.getItem('requests') !== [] && requestValues.length <= 10) {
    requestValues.forEach((element) => requestList.insertAdjacentHTML('beforeend',`<div class="requestElement offcanvas-header"><p class="requestTitleElement"> ${element}</p><button type="button" class='deleteButton btn-close'></button></div>  `));
  }
}

function eventSearch() {
  document.addEventListener('click', (event) => {
    if (event.target.matches('p') && event.target.closest('.requestElement') !== null) {
      event.stopImmediatePropagation();
      cityBase.city = event.target.closest('.requestTitleElement').textContent;
      listFiveWeather.innerHTML = '';
      startApp();
    }
  });
  
    input.addEventListener('input', (event) => {
    if (input.value.length === 1 && event.data === ' ') {
        input.value = '';
    } else {
        input.value = input.value.replace(/[^a-z\s]/gi, '')
        .toLowerCase();
    }
  });
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!input.value) {
        return false;
      }
        cityBase.city = input.value;
        valuesRequest();
        startApp();
        input.value = '';
        listFiveWeather.innerHTML = '';
      });
  
    const deleteButton = document.querySelectorAll('.deleteButton');
  
    deleteButton.forEach((element) => {
      element.addEventListener('click', (event) => {
        const deleteCityInArray = event.target.previousElementSibling.textContent.trim();
        const indexCityInArray = requestValues.indexOf(deleteCityInArray);
        const deletedCity = element.closest('.requestElement');
  
        if (requestValues.length === 1) {
          requestValues.splice(indexCityInArray, 1);
          deletedCity.remove();
          localStorage.clear();
        } else {
          requestValues.splice(indexCityInArray, 1);
          deletedCity.remove();
          localStorage.setItem('requests', JSON.stringify(requestValues));
        }
     });
  });
}