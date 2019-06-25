const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const weatherData = document.querySelector("#weather-data");
const dayTimeImg = document.querySelector("img.day-time");
const weatherIcon = document.querySelector(".icon img");
const currentDate = new Date();
const currentYear = currentDate.getUTCFullYear()
const footerYear = document.querySelector(".year")
footerYear.textContent = currentYear



const formatTime = date => {
  const formated = new Date(date);
  return formated.toDateString();
};

const getCurrentTime = () => {
  const now = new Date();
  let time = now.toLocaleTimeString();
  // const time = now.toLocaleString()
  time = time.slice(0,5)
  return time;
};
getCurrentTime();

const convertTemp = f => {
  const temp = parseFloat(f);
  return ((temp - 32) / 1.8).toFixed(1);
};

const updateUI = data => {
  const { cityDetails, weatherDetails, fiveDaysDetails } = data;
  console.log(cityDetails);
  console.log(weatherDetails);
  console.log(fiveDaysDetails);

  const details = fiveDaysDetails
    .slice(1)
    .map(day => {
      return `
    <div class="day">
      <h6 class="date">${formatTime(day.Date)}</h6>
      <p>Max Temperature: <span class="temp">${convertTemp(
        day.Temperature.Maximum.Value
      )} &deg;C</span></p>
      <p>Min Temperature: <span class="temp">${convertTemp(
        day.Temperature.Minimum.Value
      )} &deg;C</span></p>
      <p>Day:  <span class="conditions">${day.Day.IconPhrase}</span></p>
      <img src="img/icons/${day.Day.Icon}.svg" alt="${day.Day.IconPhrase}"/>
      <p>Night:  <span class="conditions">${day.Night.IconPhrase}</span></p>
      <img src="img/icons/${day.Night.Icon}.svg" alt="${
        day.Night.IconPhrase
      }" />
    <div class="card-action">
      <a href="${day.MobileLink}" target="_blank">Day Details</a>
    </div>
    </div>
`;
    })
    .join("");

  weatherData.innerHTML = `
    <div class="card-content">
      <h6 class="date">Current Weather Conditions</h6>
      <h6 class="date date-small">Now: ${getCurrentTime()}</h6>
      <h4>${cityDetails.EnglishName} <small>${
    cityDetails.Country.ID
  }</small></h4>
      <h6>Description: <span class="conditions">${
        weatherDetails.WeatherText
      }</span></h6>
      <p>Temperature: <span class="temp">${
        weatherDetails.Temperature.Metric.Value
      } &deg;C</span>
      </p>
    </div>
    <div class="card-action">
        <a href="${weatherDetails.MobileLink}" target="_blank">See Details</a>
    </div>
    ${details}
  `;

  const iconSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`;
  weatherIcon.src = iconSrc;

  let timeSrc = weatherDetails.IsDayTime ? "img/day.jpg" : "img/night.jpg";

  // if(weatherDetails.IsDayTime) {
  //     timeSrc = "img/day.svg"
  // } else {
  //     timeSrc = "img/night.svg"
  // }

  dayTimeImg.setAttribute("src", timeSrc);

  if (card.classList.contains("hide")) {
    card.classList.remove("hide");
  }
};

const updateCityName = async city => {
  console.log(city);

  const cityDetails = await getCity(city);
  const weatherDetails = await getWeather(cityDetails.Key);
  const fiveDaysDetails = await fiveDaysForecast(cityDetails.Key);

  console.log(cityDetails);
  console.log(weatherDetails);
  console.log(fiveDaysDetails);

  return {
    cityDetails,
    weatherDetails,
    fiveDaysDetails
  };
};

cityForm.addEventListener("submit", e => {
  e.preventDefault();

  const city = document.querySelector("#city-search").value.trim();
  console.log(city);

  cityForm.reset();

  updateCityName(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  // localStorage
  localStorage.setItem("city", city);
});


if (localStorage.getItem("city")) {
  updateCityName(localStorage.getItem("city"))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}

