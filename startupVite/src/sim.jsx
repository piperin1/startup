import { useState, useEffect } from 'react'
import eatAnim from './animations/eat_anim.gif'
import idleAnim from './animations/idle_anim.gif'
import './home.css'
import MockNotification from './notifs'
import { GameEvent, GameNotifier } from './gameNotifier';
import React from 'react'


function Simulator() {

  const [hunger, setHunger] = useState(() => parseInt(localStorage.getItem('hunger')) || 0);
  const [happiness, setHappiness] = useState(() => parseInt(localStorage.getItem('happiness')) || 0);
  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem('level');
    return savedLevel !== null && !isNaN(parseInt(savedLevel, 10)) ? parseInt(savedLevel, 10) : 0;
  });
  

  const [isEating, setIsEating] = useState(false);
  const [isBeingPet, setIsBeingPet] = useState(false);

  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');

  //Weather API copy integration for background changes

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

 
  const getBackgroundClass = () => {
    if (currentWeather === 'Clear skies' || currentWeather === 'Mainly clear') return 'clear';
    if (currentWeather === 'Partly cloudy') return 'partly-cloudy';
    if (currentWeather === "Overcast" || currentWeather === 'Foggy') return 'overcast';
    if (currentWeather === "Drizzle" || currentWeather === "Moderate drizzle" || currentWeather === "Light rain") return 'light-rain';
    if (currentWeather === "Heavy drizzle" || currentWeather === "Moderate rain" || currentWeather === "Heavy rain" || currentWeather === "Thunderstorm") return 'heavy-rain';
    if (currentWeather === "Light snow" || currentWeather === "Freezing fog") return 'light-snow';
    if (currentWeather === "Heavy snow" || currentWeather === "Moderate snow") return 'heavy-snow';
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
    setHunger(Math.min(hunger + 30, 100)); 
    setIsEating(true);
    setTimeout(() => setIsEating(false), 2000);
    handleLvl();
    handleFeedClick();
  }

  const handlePet = () => {
    if (isEating || isBeingPet) return;
    setHappiness(Math.min(happiness + 30, 100));
    setIsBeingPet(true);
    setTimeout(() => setIsBeingPet(false), 2000);
    handleLvl();
    handlePetClick();
  }

  const handleAnim = () => {
    if (isEating) return eatAnim;
    if (isBeingPet) return eatAnim;
    return idleAnim;
  }

  

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await fetch('/api/secure/level', { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to fetch level.');
        
        const data = await response.json();
        const fetchedLevel = parseInt(data.level, 10);
        
        if (isNaN(fetchedLevel)) {
          console.error('Invalid level data from backend:', data.level);
          setLevel(0); // Default to 0 if invalid
        } else {
          setLevel(fetchedLevel);
          localStorage.setItem('level', fetchedLevel); // Sync with localStorage
        }
      } catch (error) {
        console.error('Error fetching level:', error);
      }
    };
  
    fetchLevel();
  }, []);
  

  const handleLvl = async () => {
    if (happiness === 100 && hunger === 100) {
      const newLevel = isNaN(level) ? 1 : level + 1;
      handleLevelClick();
      setLevel(newLevel);
      setHappiness(0);
      setHunger(0);
  
      try {
        const response = await fetch('/api/secure/level', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ level: newLevel }),
        });
  
        if (!response.ok) throw new Error('Failed to update level on server.');
        console.log('Level successfully updated on server.');
      } catch (error) {
        console.error('Error updating level:', error);
      }
    }
  };
  
    function handleFeedClick() {
      GameNotifier.broadcastEvent(userName, GameEvent.Feed, { action: 'fed their pet' });
    }
  
    function handlePetClick() {
      GameNotifier.broadcastEvent(userName, GameEvent.Pet, { action: 'petted their pet' });
    }

    function handleLevelClick() {
      GameNotifier.broadcastEvent(userName, GameEvent.Level, { action: 's pet leveled up!' });
    }



  return (
    <>
      <div id="mainsimbg" className={getBackgroundClass()}>
      <div id="simulator" className="row">
        <div id="col1" className = "column">
          <h3>actions</h3>
          <p id="button" className="click" onClick={handleFeed}>feed</p>
          <p id="button" className ="click" onClick={handlePet}>pet</p>
        </div>
        <div id= "col2" className ="column">
          <img alt="pet idle animation" src={handleAnim()} height="300" width="275"/>
          <h3>{userName}'s pet | lvl {level}</h3>
        </div>
        <div id= "col3" className="column">
          <h3>stats</h3>
          <p id="button">hunger:{hunger}</p>
          <p id="button">happiness:{happiness}</p>
      </div>
      </div>
      </div>

      
      <div id="notifs">
      <h4>Notifications</h4>
      <div>{<MockNotification userName={userName}/>}</div>
      </div>
    
    </>
  )
}

export default Simulator
