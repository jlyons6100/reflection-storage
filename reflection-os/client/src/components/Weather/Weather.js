import React from 'react';
import axios from 'axios';

import './Weather.css';
import clearDay from './Icons/clear-day.png';
import clearNight from './Icons/clear-night.png';
import partlyCloudyDay from './Icons/partly-cloudy-day.png';
import partlyCloudyNight from './Icons/partly-cloudy-night.png';
import cloudy from './Icons/cloudy.png';
import brokenClouds from './Icons/broken-clouds.png';
import showerRain from './Icons/shower-rain.png';
import rain from './Icons/rain.png';
import thunderstorm from './Icons/thunderstorm.png';
import snow from './Icons/snow.png';
import mist from './Icons/mist.png';

// From https://openweathermap.org/weather-conditions
// Day Icon | Night Icon | Condition name
// ========================================
//  01d.png |  01n.png   | clear sky
//  02d.png |  02n.png   | few clouds
//  03d.png |  03n.png   | scattered clouds
//  04d.png |  04n.png   | broken clouds
//  09d.png |  09n.png   | shower rain
//  10d.png |  10n.png   | rain
//  11d.png |  11n.png   | thunderstorm
//  13d.png |  13n.png   | snow
//  50d.png |  50n.png   | mist

const codeToIconMap = {
  '01d': clearDay,
  '01n': clearNight,
  '02d': partlyCloudyDay,
  '02n': partlyCloudyNight,
  '03d': cloudy,
  '03n': cloudy,
  '04d': brokenClouds,
  '04n': brokenClouds,
  '09d': showerRain,
  '09n': showerRain,
  '10d': rain,
  '10n': rain,
  '11d': thunderstorm,
  '11n': thunderstorm,
  '13d': snow,
  '13n': snow,
  '50d': mist,
  '50n': mist
};

class ImgComponent extends React.Component {
  render() {
    const iconCode = this.props.iconCode;
    const mainWeather = this.props.mainWeather;
    return (
      <div className="image_wrapper">
        <img className="image" src={codeToIconMap[iconCode]} alt={mainWeather} />
      </div>
    );
  }
}

class TextComponent extends React.Component {
  render() {
    let curr_ = Math.round(this.props.vals.curr);
    let max_ = Math.round(this.props.vals.max);
    let min_ = Math.round(this.props.vals.min);
    let main_ = this.props.vals.main.toLowerCase();

    return (
      <div>
        <p>Current temperature: {curr_}º.</p>
        <p>Conditions: {main_}.</p>
        <p>
          High of {max_}º. Low of {min_}º.
        </p>
      </div>
    );
  }
}

class Weather extends React.Component {
  getWeather(zipcode) {
    // API key for openweathermap.org
    let key = 'b97aa5b6be0fa406efbf9e5664826802';
    let weatherLink =
      'https://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + '&appid=' + key + '&callback=?&units=imperial';

    axios
      .get(weatherLink)
      .then(response => {
        // This is hacky, for some reason openweatherapi has a weird ?({data}) syntax on response.data
        let data_ = JSON.parse(response.data.slice(2, -1));

        let curr_ = data_.main.temp;
        let max_ = data_.main.temp_max;
        let min_ = data_.main.temp_min;
        let main_ = data_.weather[0].main;
        let iconCode_ = data_.weather[0].icon;
        this.setState({ curr: curr_, max: max_, min: min_, main: main_, iconCode: iconCode_, ready: 1 });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      ready: 0,
      curr: 0,
      max: 0,
      min: 0,
      main: 'Text here',
      zip: this.props.zipCode,
      iconCode: ''
    };
  }

  componentDidMount() {
    this.getWeather(this.props.zipCode);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.getWeather(nextProps.zipCode);
  }

  render() {
    if (this.state.ready === 0 || !this.props.show) {
      console.log("WE ARE SO FUCKED");
      return null;
    }

    return (
      <div className="weather_container">
        <ImgComponent iconCode={this.state.iconCode} mainWeather={this.state.mainWeather} />
        <TextComponent vals={this.state} />
      </div>
    );
  }
}

export default Weather;
