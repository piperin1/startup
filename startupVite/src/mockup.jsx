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
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );

          if (!response.ok) throw new Error('Failed to fetch weather data.');

          const data = await response.json();
          const weatherCode = data.current_weather.weathercode;

          // Map Open-Meteo weather codes to descriptions
          const weatherDescriptions = {
            0: 'Clear skies',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Foggy',
            48: 'Freezing fog',
            51: 'Drizzle',
            53: 'Moderate drizzle',
            55: 'Heavy drizzle',
            61: 'Light rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            71: 'Light snow',
            73: 'Moderate snow',
            75: 'Heavy snow',
            95: 'Thunderstorm',
          };

          const description = weatherDescriptions[weatherCode] || 'Unknown weather';
          setCurrentWeather(description);
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
/*

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

*/
export default MockWeather;