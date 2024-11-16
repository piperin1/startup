import { useState, useEffect } from 'react';

function MockWeather() {
  const [currentWeather, setCurrentWeather] = useState('Loading weather...');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error(error);
        setCurrentWeather('Unable to retrieve location.');
      }
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchWeather = async () => {
        try {
          const response = await fetch(`/api/weather?latitude=${latitude}&longitude=${longitude}`);

          if (!response.ok) throw new Error('Failed to fetch weather data.');

          const data = await response.json();
          setCurrentWeather(data.description);
        } catch (error) {
          console.error(error);
          setCurrentWeather('Error retrieving weather data.');
        }
      };

      fetchWeather();
    }
  }, [latitude, longitude]);

  return <>{currentWeather}</>;
}

export default MockWeather;