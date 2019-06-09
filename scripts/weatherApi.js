// const herokuApp = "https://cors-anywhere.herokuapp.com/"

const apiKey = "XckeMGm2mkwrlSWiG6mcgyqNruTbr3wW";

const getCity = async city => {
  const resourceUrl =
    "http://dataservice.accuweather.com/locations/v1/cities/search";

  const query = `?apikey=${apiKey}&q=${city}`;

  const response = await fetch(resourceUrl + query);

  const data = await response.json();

  console.log(data);

  return data[0];
};

// getCity("warsaw");

const getWeather = async locationID => {
  const resourceUrl =
    "http://dataservice.accuweather.com/currentconditions/v1/";

  const query = `${locationID}?apikey=${apiKey}`;

  const response = await fetch(resourceUrl + query);

  const data = await response.json();

  console.log(data);

  return data[0];
};

// getWeather("329260");

const fiveDaysForecast = async locationID => {
  resourceUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  const query = `${locationID}?apikey=${apiKey}`;

  const response = await fetch(resourceUrl + query);

  const data = await response.json();

  console.log(data);

  return data.DailyForecasts;
};

// fiveDaysForecast("329260")
