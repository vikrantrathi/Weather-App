import React, { useEffect, useState } from 'react';
import { useStateContext } from '../Context';
import Clear from '../assets/images/Clear.jpg';
import Fog from '../assets/images/fog.png';
import Cloudy from '../assets/images/cloudy.gif';
import Rainy from '../assets/images/giphy.webp';
import Snow from '../assets/images/snow.jpg';
import Stormy from '../assets/images/Stormy.jpg';
import Sunny from '../assets/images/Sunny.jpg';

const BackgroundLayout = () => {
  const { weather } = useStateContext();
  const [image, setImage] = useState(Clear);

  useEffect(() => {
    // Ensure weather is defined before accessing its properties
    if (weather && weather.conditions) {
      let imageString = weather.conditions.toLowerCase();
      if (imageString.includes('clear')) {
        setImage(Clear);
      } else if (imageString.includes('cloud')) {
        setImage(Cloudy);
      } else if (imageString.includes('rain') || imageString.includes('shower')) {
        setImage(Rainy);
      } else if (imageString.includes('snow')) {
        setImage(Snow);
      } else if (imageString.includes('fog')) {
        setImage(Fog);
      } else if (imageString.includes('thunder') || imageString.includes('storm')) {
        setImage(Stormy);
      }
    }
  }, [weather]);

  return (
    <img src={image} alt="weather_image" className='h-screen w-full fixed left-0 top-0 -z-[10]' />
  );
};

export default BackgroundLayout;
