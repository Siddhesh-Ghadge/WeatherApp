window.onload = function () {
  const c_name = document.getElementById("cityName");

  if (c_name !== null) {
    c_name.innerHTML = "Pune"; // Set default city
  } else {
    console.error("Something went wrong in CityName");
  }

  const url = "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "replace with your API key",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  const loadingSpinner = document.getElementById("loadingSpinner");

  async function fetchWeather(city) {
    try {
      loadingSpinner.style.display = "block";

      const response = await fetch(url + city, options);
      const result = await response.json();

      let min_tempereture = document.getElementById("min_temp");
      let max_tempereture = document.getElementById("max_temp");
      let temperature = document.getElementById("temp");
      let humid = document.getElementById("humidity");
      let wind_s = document.getElementById("wind_speed");
      let wind_d = document.getElementById("wind_degrees");
      let cl_per = document.getElementById("cloud_pct");
      let sr = document.getElementById("sunrise");
      let ss = document.getElementById("sunset");

      c_name.innerHTML = city;

      min_tempereture.innerHTML = result.min_temp;
      max_tempereture.innerHTML = result.max_temp;
      temperature.innerHTML = result.temp;
      humid.innerHTML = result.humidity;
      // feels_like.innerHTML = result?.feels_like;
      time = result?.sunrise;
      // sunset.innerHTML = result?.sunset;

      wind_s.innerHTML = result.wind_speed;
      wind_d.innerHTML = result.wind_degrees;
      cl_per.innerHTML = result.cloud_pct;

      ss.innerHTML = getTime(result.sunset);
      sr.innerHTML = getTime(result.sunrise);

      // console.log(formattedDateTime);

      console.log(result);
      // Hide loading spinner and show weather info
      loadingSpinner.style.display = "none";
    } catch (error) {
      // Hide loading spinner and weather info
      loadingSpinner.style.display = "none";
      console.error(error);
    }
  }

  fetchWeather("Pune"); // Showing Pune's weather by default.

  const sub_btn = document.getElementById("submit_btn");

  if (sub_btn !== null) {
    sub_btn.addEventListener("click", (e) => {
      e.preventDefault();
      fetchWeather(city.value);
    });
  } else {
    console.error("Submit button not found");
  }
};

const getTime = (time) => {
  // Convert Unix timestamp to milliseconds
  const timestampInMilliseconds = time * 1000;

  // Create a new Date object using the timestamp
  const date = new Date(timestampInMilliseconds);

  // Get components of the date

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Create a readable date and time string
  let t = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return t;
};
