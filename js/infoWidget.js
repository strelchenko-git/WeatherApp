function getTime() {
    setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
  
      if (hours < 10) {
        time.textContent = `0${hours}:${minutes}:${seconds}`;
      };
  
      if (minutes < 10) {
        time.textContent = `${hours}:0${minutes}:${seconds}`;
      };
  
      if (seconds < 10) {
        time.textContent = `${hours}:${minutes}:0${seconds}`;
      };
  
      if (hours >= 10 && minutes >= 10 && seconds >= 10) {
        time.textContent = `${hours}:${minutes}:${seconds}`;
      };
    }, 500);
  }
  
  function getDateToday() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const formattedDate = `${day}.${month + 1}.${year}`;
    dateToday.textContent = formattedDate;
  }
  
  function getDayToday() {
    const date = new Date();
    const day = date.getDay();
  
    switch (day) {
      case 0:
        dayToday.textContent = 'Sunday';
        break;
  
      case 1:
        dayToday.textContent = 'Monday';
        break;
  
      case 2:
        dayToday.textContent = 'Tuesday';
        break;
  
      case 3:
        dayToday.textContent = 'Wednesday';
        break;
  
      case 4:
        dayToday.textContent = 'Thursday';
        break;
  
      case 5:
        dayToday.textContent = 'Friday';
        break;
  
      case 6:
        dayToday.textContent = 'Saturday';
        break;
    }
  }
  