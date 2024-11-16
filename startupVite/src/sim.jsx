import { useState, useEffect } from 'react'
import eatAnim from './animations/eat_anim.gif'
import idleAnim from './animations/idle_anim.gif'
import './home.css'
import MockNotification from './notifs'


function Simulator() {

  const [hunger, setHunger] = useState(() => parseInt(localStorage.getItem('hunger')) || 0);
  const [happiness, setHappiness] = useState(() => parseInt(localStorage.getItem('happiness')) || 0);
  const [level, setlevel] = useState(() => parseInt(localStorage.getItem('level')) || 0);

  const [isEating, setIsEating] = useState(false);
  const [isBeingPet, setIsBeingPet] = useState(false);

  //Weather API integration for background changes
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

 
  const getBackgroundClass = () => {
    if (currentWeather === 0 || currentWeather === 1) return 'clear';
    if (currentWeather === 2) return 'partly-cloudy';
    if (currentWeather === "Overcast" || currentWeather === 45) return 'overcast';
    if (currentWeather === 51 || currentWeather === 53 || currentWeather === 61) return 'light-rain';
    if (currentWeather === 55 || currentWeather === 63 || currentWeather === 65 || currentWeather === 95) return 'heavy-rain';
    if (currentWeather === 71 || currentWeather === 48) return 'light-snow';
    if (currentWeather === 75 || currentWeather === 73) return 'heavy-snow';
    return 'clear'; 
  };


  //Simulator code continues

  useEffect(() => {
    const interval = setInterval(() => {
      setHunger((prevHunger) => Math.max(prevHunger - 10, 0)); 
      setHappiness((prevHappiness) => Math.max(prevHappiness - 10, 0)); 
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('hunger', hunger);
    localStorage.setItem('happiness', happiness);
    localStorage.setItem('level', level)
  }, [hunger, happiness]);

  const handleFeed = () => {
    if (isEating || isBeingPet) return;
    setHunger(Math.min(hunger + 10, 100)); 
    setIsEating(true);
    setTimeout(() => setIsEating(false), 2000);
    handleLvl();
  }

  const handlePet = () => {
    if (isEating || isBeingPet) return;
    setHappiness(Math.min(happiness + 10, 100));
    setIsBeingPet(true);
    setTimeout(() => setIsBeingPet(false), 2000);
    handleLvl();
  }

  const handleAnim = () => {
    if (isEating) return eatAnim;
    if (isBeingPet) return eatAnim;
    return idleAnim;
  }

  const handleLvl = () => {
    if (happiness && hunger == 100) {
      setlevel(level + 1, 100);
      setHappiness(0);
      setHunger(0);
    }
  }

  return (
    <>
      <div id="mainsimbg" class={getBackgroundClass()}>
      <div id="simulator" class="row">
        <div id="col1" class = "column">
          <h3>actions</h3>
          <p id="button" class="click" onClick={handleFeed}>feed</p>
          <p id="button" class="click" onClick={handlePet}>pet</p>
        </div>
        <div id= "col2" class="column">
          <img alt="pet idle animation" src={handleAnim()} height="300" width="275"/>
          <h3>pet name | lvl {level}</h3>
        </div>
        <div id= "col3" class="column">
          <h3>stats</h3>
          <p id="button">hunger:{hunger}</p>
          <p id="button">happiness:{happiness}</p>
      </div>
      </div>
      </div>

      <section>
      <div id="notifs">
      <h4>Notifications</h4>
      <div>{<MockNotification/>}</div>
      </div>
      </section>
    </>
  )
}

export default Simulator
