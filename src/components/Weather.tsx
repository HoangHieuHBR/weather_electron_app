import { FC, useState } from 'react';

import axios from 'axios';

import WeatherCSS from './Weather.module.css';
import { TiWeatherWindy } from 'react-icons/ti';
import { BsSearch } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';
import { AiFillCloud } from 'react-icons/ai';

import WeatherIcon from './WeatherIcon';

interface WeatherData {
  name: string;
  weather: { description: string }[];
  main: { temp: number };
  wind: { speed: number };
  clouds: { all: number };
}

const Weather: FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const apiKey = '7b54f86f928417f9a01f94bee5a42ead';
  const apiEndpoint = 'https://api.openweathermap.org/data/2.5/';

  async function changeCity() {
    try {
      console.log(`Here 1`);
      const url = `${apiEndpoint}weather?q=${city}&APPID=${apiKey}`;
      const response = await axios.get(url);
      const data = response.data;
      console.log(`Here ${data}`);
      setWeatherData(data);
    } catch (error) {
      console.log(`Here 2`);
      console.error(error);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      changeCity();
    }
  };

  return (
    <div className={WeatherCSS.weatherBlock}>
      <div className={WeatherCSS.cityInput}>
        <FaLocationDot className={WeatherCSS.locationIcon} />

        <input onChange={(e) => setCity(e.target.value)} onKeyDown={handleKeyDown} />

        <button onClick={changeCity}>
          <BsSearch />
        </button>
      </div>

      {weatherData ? (
        <>
          <div className={WeatherCSS.cityName}>
            <h2>{weatherData.name}</h2>
          </div>

          <div className={WeatherCSS.weatherIcon}>
            <WeatherIcon weatherType={weatherData} />
            <p>{weatherData.weather[0].description.toUpperCase()}</p>
          </div>

          <div className={WeatherCSS.weatherInfoBlock}>
            <h1>{(weatherData.main.temp - 273).toFixed(0)} °C</h1>

            <div className={WeatherCSS.weatherInfo}>
              <p>
                <TiWeatherWindy />
                Wind: {weatherData.wind.speed.toFixed(0)} m/s
              </p>
              <p>
                <AiFillCloud />
                Cloudy: {weatherData.clouds.all} %
              </p>
            </div>
          </div>
        </>
      ) : (
        <h2>Choose the City</h2>
      )}
    </div>
  );
};

export default Weather;
