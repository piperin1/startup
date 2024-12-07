  import React from 'react';
  import { GameEvent, GameNotifier } from './gameNotifier';
  import './home.css';
  
  function MockNotification({ userName }) {
    const [notifications, setNotifications] = React.useState([]);

    React.useEffect(() => {
      // Handler to add the new event to the notifications
      const handleGameEvent = (event) => {
        setNotifications((prevNotifications) => {
          const newNotifications = [...prevNotifications, event];
          // If there are more than 3 notifications, remove the oldest one
          if (newNotifications.length > 3) {
            newNotifications.shift();
          }
          return newNotifications;
        });
      };
  
      GameNotifier.addHandler(handleGameEvent);

      return () => {
        GameNotifier.removeHandler(handleGameEvent);
      };
    }, []);

  
    function createMessageArray() {
      return notifications.map((event, index) => {

        let message = ' unknown';
        if (event.type === GameEvent.Feed) {
          message = ` fed their pet!`;
        } else if (event.type === GameEvent.Pet) {
          message = ` petted their pet!`;
        } else if (event.type === GameEvent.Level) {
          message = `'s pet leveled up!`;
        }
        else if (event.type == GameEvent.System){
          message = ` connecting`;
        }
  
        return (
          <div key={index} className="event">
            <span className="player-event">{event.from}</span>
            {message}
          </div>
        );
      });
    }
  
    return (
      <div className="notifsBar">
        <div id="player-messages">{createMessageArray()}</div>
      </div>
    );
  }
  
export default MockNotification;