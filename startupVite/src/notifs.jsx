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
    const [events, setEvents] = React.useState([]);
  
    React.useEffect(() => {
      GameNotifier.addHandler(handleGameEvent);
  
      return () => {
        GameNotifier.removeHandler(handleGameEvent);
      };
    });
  
    function handleGameEvent(event) {
      setEvents([...events, event]);
    }
  
    function createMessageArray() {
      return events.map((event, index) => {
        let message = 'unknown';
        if (event.type === GameEvent.Feed) {
          message = `fed the pet`;
        } else if (event.type === GameEvent.Pet) {
          message = `petted the pet`;
        } else if (event.type === GameEvent.System) {
          message = event.value.msg;
        }
  
        return (
          <div key={index} className="event">
            <span className="player-event">{event.from.split('@')[0]}</span>
            {message}
          </div>
        );
      });
    }
  
    return (
      <div className="players">
        <div>
          Player <span className="player-name">{userName}</span>
        </div>
        <div id="player-messages">{createMessageArray()}</div>
      </div>
    );
  }
  
export default MockNotification;