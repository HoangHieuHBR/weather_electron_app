import React, { FC } from 'react';

import ClearSky from '../assets/Icons/ClearSky.png';
import FewClouds from '../assets/Icons/FewClouds.png';
import Clouds from '../assets/Icons/Clouds.png';
import Rain from '../assets/Icons/Rain.png';
import Snow from '../assets/Icons/Snow.png';
import Mist from '../assets/Icons/Mist.png';

interface WeatherIconProps {
  weatherType: any;
}

const WeatherIcon: FC<WeatherIconProps> = ({ weatherType }) => {
  const weatherIcons: { [key: string]: string } = {
    'Clear': ClearSky,
    'Clouds': Clouds,
    'Few Clouds': FewClouds,
    'Rain': Rain,
    'Snow': Snow,
    'Mist': Mist,
    'Fog': Mist,
    'Haze': Mist
  };

  const weatherMain = weatherType.weather[0].main;
  const iconSrc = weatherIcons[weatherMain];

  return (
    <div>
      <img src={iconSrc} alt={weatherMain} />
    </div>
  );
};

export default WeatherIcon;
