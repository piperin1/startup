/*import { useState, useEffect } from 'react';

function MockNotification() {
    const actions = ['fed', 'petted'];
    const [notification, setNotification] = useState(`Someone has ${actions[0]} their pet`);
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % actions.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }, []);
  
    useEffect(() => {
      setNotification(`Someone has ${actions[index]} their pet`);
    }, [index]);
  
    return <p>{notification}</p>;
  }

  export default MockNotification;*/

  import React from 'react';
  import { GameEvent, GameNotifier } from './gameNotifier';
  import './home.css';
  
  function MockNotification({ userName }) {
    const [latestEvent, setLatestEvent] = React.useState(null);

  
    React.useEffect(() => {
      GameNotifier.addHandler(handleGameEvent);
  
      return () => {
        GameNotifier.removeHandler(handleGameEvent);
      };
    });
  
    function handleGameEvent(event) {
      setLatestEvent(event);
    }
  
    function createMessageArray() {
      if (!latestEvent) return null; // No message to display initially

      let message = 'unknown';
      if (latestEvent.type === GameEvent.Feed) {
        message = ` fed their pet!`;
      } else if (latestEvent.type === GameEvent.Pet) {
        message = ` petted their pet!`;
      }
  
      return (
        <div className="event">
          <span className="player-event">{latestEvent.from}</span>
          {message}
        </div>
      );
    }
  
    return (
      <div className="notifsBar">
        <div id="player-messages">{createMessageArray()}</div>
      </div>
    );
  }
  
export default MockNotification;