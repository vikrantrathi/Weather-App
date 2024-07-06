import React, { useState } from 'react';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';

function App() {
  const [input, setInput] = useState('');
  const { weather, thisLocation, values, place, setPlace } = useStateContext() || {}; // Default to empty object if context is undefined

  const submitCity = () => {
    setPlace(input);
    setInput('');
  }

  // Function to convert Fahrenheit to Celsius
  const fahrenheitToCelsius = (fahrenheit) => {
    const celsius = ((fahrenheit - 32) * 5) / 9;
    return parseFloat(celsius.toFixed(2)); // Round to 2 decimal places
  };

  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center gap-2'>
        <h1 className='font-bold tracking-wide md:text-3xl text-xl border-4 px-3 rounded-md bg-black py-1 border-black shadow-md shadow-white'>Weather</h1>
        <div className='bg-white w-36 md:w-72 overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
          <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
          <input
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                submitCity();
              }
            }}
            type="text"
            placeholder='Search city'
            className='focus:outline-none w-full text-[#212121] text-lg'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
      </nav>
      <BackgroundLayout/>
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center mt-16'>
        {weather && (
          <WeatherCard
            place={thisLocation}
            windspeed={weather.wspd}
            humidity={weather.humidity}
            temperature={fahrenheitToCelsius(weather.temp)} // Convert Fahrenheit to Celsius here
            heatIndex={weather.heatindex}
            iconString={weather.conditions}
            conditions={weather.conditions}
          />
        )}

        <div className='flex  justify-center gap-8 flex-wrap w-[60%]'>
          {values?.slice(1, 7).map(curr => (
            <MiniCard
              key={curr.datetime}
              time={curr.datetime}
              temp={fahrenheitToCelsius(curr.temp)} // Convert Fahrenheit to Celsius here
              iconString={curr.conditions}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
