import { useState, useEffect } from 'react';

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

  export default MockNotification;