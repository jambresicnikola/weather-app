const currentTime = new Date().getHours();

if(currentTime >= 21 || currentTime < 6) {
  document.body.style.backgroundImage = "url(images/nightBackground.jpg)";
  document.querySelector("main").style.backgroundColor = "rgba(0, 9, 87, 0.5)";
  document.querySelectorAll("article").forEach(element => {
    element.style.backgroundColor = "rgb(0, 13, 133)";
  });
}

const apiKey = "yourAPIkey";

function fetchWeatherData () {
  const cityName = document.getElementById("cityName").value;

  if(!cityName) {
    alert("City name cannot be empty.");
    return;
  }

  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3&aqi=no&alerts=no`;
  
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    if(data.error) {
      alert("City not found!\nPlease enter a valid city name.")
      return;
    }

    updateCurrentWeather(data.current);

    updateForecastDays(data.forecast.forecastday);  
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    alert("Something went wrong. Please try again later.");
  });
}

function updateCurrentWeather(current) {
  document.getElementById("currentTemperature").innerHTML = `${current.temp_c}°C`;
  document.getElementById("currentConditionText").innerHTML = current.condition.text;
  document.getElementById("currentConditionIcon").src = `https:${current.condition.icon}`;
  document.getElementById("currentWind").innerHTML = `${current.wind_kph} km/h`;
  document.getElementById("currentPrecip").innerHTML = `${current.precip_mm} mm`;
  document.getElementById("currentAtmosphericPressure").innerHTML = `${current.pressure_mb} hPa`;
}

function updateForecastDays(forecastDays) {
  for(let i = 0; i < forecastDays.length; i++) {
    const forecastDay = forecastDays[i];

    document.getElementsByClassName("day")[i].innerHTML = new Date(forecastDay.date).toLocaleDateString("en-US", {weekday: "short"});
    document.getElementsByClassName("minTemperature")[i].innerHTML = `${forecastDay.day.mintemp_c}°C`;
    document.getElementsByClassName("maxTemperature")[i].innerHTML = `${forecastDay.day.maxtemp_c}°C`;
    document.getElementsByClassName("conditionText")[i].innerHTML = forecastDay.day.condition.text;
    document.getElementsByClassName("conditionIcon")[i].src = `https:${forecastDay.day.condition.icon}`;
    document.getElementsByClassName("wind")[i].innerHTML = `${forecastDay.day.maxwind_kph} km/h`;
    document.getElementsByClassName("precip")[i].innerHTML = `${forecastDay.day.totalprecip_mm} mm`;
  }
}