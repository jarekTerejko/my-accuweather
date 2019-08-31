class Forecast {
  constructor() {
    this.herokuApp = "https://cors-anywhere.herokuapp.com/";
    this.apiKey = "kCBGyuMGpQsTZTmB1BGorbS550PC8ZTd";
    this.weatherURI =
      "https://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURI =
      "https://dataservice.accuweather.com/locations/v1/cities/search";
    this.fiveDaysURI =
      "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  }
  async updateCityName(city) {
    const cityDetails = await this.getCity(city);
    const weatherDetails = await this.getWeather(cityDetails.Key);
    const fiveDaysDetails = await this.getFiveDaysForecast(cityDetails.Key);

    return {
      cityDetails,
      weatherDetails,
      fiveDaysDetails
    };
  }

  async getCity(city) {
    const query = `?apikey=${this.apiKey}&q=${city}`;

    const response = await fetch(this.herokuApp + this.cityURI + query);

    const data = await response.json();

    console.log(data);

    return data[0];
  }

  async getWeather(locationID) {
    const query = `${locationID}?apikey=${this.apiKey}`;

    const response = await fetch(this.herokuApp + this.weatherURI + query);

    const data = await response.json();

    console.log(data);

    return data[0];
  }

  async getFiveDaysForecast(locationID) {
    const query = `${locationID}?apikey=${this.apiKey}`;

    const response = await fetch(this.herokuApp + this.fiveDaysURI + query);

    const data = await response.json();

    console.log(data);

    return data.DailyForecasts;
  }
}

// const herokuApp = "https://cors-anywhere.herokuapp.com/";

// const apiKey = "kCBGyuMGpQsTZTmB1BGorbS550PC8ZTd";

// const getCity = async city => {
//   const resourceUrl =
//     "https://dataservice.accuweather.com/locations/v1/cities/search";

//   const query = `?apikey=${apiKey}&q=${city}`;

//   const response = await fetch(herokuApp + resourceUrl + query);

//   const data = await response.json();

//   console.log(data);

//   return data[0];
// };

// getCity("warsaw");

// const getWeather = async locationID => {
//   const resourceUrl =
//     "https://dataservice.accuweather.com/currentconditions/v1/";

//   const query = `${locationID}?apikey=${apiKey}`;

//   const response = await fetch(herokuApp + resourceUrl + query);

//   const data = await response.json();

//   console.log(data);

//   return data[0];
// };

// getWeather("329260");

// const fiveDaysForecast = async locationID => {
//   resourceUrl = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";
//   const query = `${locationID}?apikey=${apiKey}`;

//   const response = await fetch(herokuApp + resourceUrl + query);

//   const data = await response.json();

//   console.log(data);

//   return data.DailyForecasts;
// };

// fiveDaysForecast("329260")
