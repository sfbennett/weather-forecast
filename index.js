function requestWeather() {
  // find select input
  var locationInput = document.querySelector(".location");

  var locations = {
    brighton: {
      lat: "50.815331",
      lon: "-0.136790",
    },
    london: {
      lat: "51.500833",
      lon: "-0.142984",
    },
    japan: {
      lat: "35.6854",
      lon: "139.7531",
    },
    australia: {
      lat: "-25",
      lon: "135",
    },
    italy: {
      lat: "42.8333",
      lon: "12.8333",
    },
    thailand: {
      lat: "15.5",
      lon: "101",
    },
    california: {
      lat: "38.6275",
      lon: "-92.5666",
    },
  };

  // find selected option's value
  var selectedLocation =
    locationInput.options[locationInput.selectedIndex].value;

  var selectedLocation = locations[selectedLocation];

  var apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation.lat}&longitude=${selectedLocation.lon}&daily=temperature_2m_max,temperature_2m_min,sunset,uv_index_max,rain_sum,wind_speed_10m_max`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data :", data);

      // once we have the new stories, update the page
      updateWeather(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// update the news
function updateWeather(data) {
  var mintemperatureElement = document.querySelector(".min-temperature");
  mintemperatureElement.textContent = data.daily.temperature_2m_min[0];

  var maxtemperatureElement = document.querySelector(".max-temperature");
  maxtemperatureElement.textContent = data.daily.temperature_2m_max[0];

  var windSpeedElement = document.querySelector(".max-wind-speed");
  windSpeedElement.textContent = data.daily.wind_speed_10m_max[0];

  var rainSumElement = document.querySelector(".rain-sum");
  rainSumElement.textContent = data.daily.rain_sum[0];

  var sunsetElement = document.querySelector(".sunset");
  sunsetElement.textContent = data.daily.sunset[0];

  var uvIndexElement = document.querySelector(".uv-index");
  uvIndexElement.textContent = data.daily.uv_index_max[0];
}

// listen for clicks on the button
var searchButton = document.querySelector(".search");
searchButton.addEventListener("click", requestWeather);
