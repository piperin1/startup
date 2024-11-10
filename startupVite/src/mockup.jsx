import { useState, useEffect } from 'react';

function MockWeather() {
  const weatherDescriptions = ['Sunny', 'Rainy', 'Cloudy', 'Snowy', 'Windy'];

  const [currentWeather, setCurrentWeather] = useState(weatherDescriptions[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % weatherDescriptions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentWeather(weatherDescriptions[index]);
  }, [index]);

  return (
    <p>{currentWeather}</p>
  );
}

export default MockWeather;