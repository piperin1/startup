import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const Simulator = () => {

    const [hunger, setHunger] = useState(() => parseInt(localStorage.getItem('hunger')) || 100);
    const [happiness, setHappiness] = useState(() => parseInt(localStorage.getItem('hunger')) || 100);
   
    const [isEating, setIsEating] = useState(false);
    const [isBeingPet, setIsBeingPet] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
          setHunger((prevHunger) => Math.max(prevHunger - 5, 0)); // decrease hunger
          setHappiness((prevHappiness) => Math.max(prevHappiness - 5, 0)); // decrease happiness
        }, 5000); // Every 5 seconds (adjust as needed)

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    useEffect(() => {
        localStorage.setItem('hunger', hunger);
        localStorage.setItem('happiness', happiness);
      }, [hunger, happiness]);


    const handleFeed = () => {
        setHunger(Math.min(hunger + 10, 100)); 
        setIsEating(true);
        setTimeout(() => setIsEating(false), 2000);
    }

    const handlePet = () => {
        setHappiness(Math.min(happiness + 10, 100));
        setIsBeingPet(true);
        setTimeout(() => setIsBeingPet(false), 2000);
    }
    
    return (
        <>
        <div id="col1" class = "column">
        <h3>actions</h3>
        <p id="button" onClick={handleFeed}>feed</p>
        <p id="button" onClick={handlePet}>pet</p>
      </div>
      <div id= "col2" class="column">
        <img alt="pet fill-in" src="/images/pet_filler.png" height="300" width="300"/>
        <h3>pet name | lvl __</h3>
      </div>
      <div id= "col3" class="column">
        <h3>stats</h3>
        <p id="button">{hunger}</p>
        <p id="button">{happiness}</p>
      </div>
      </>
    );

};

const root = ReactDOM.createRoot(document.getElementById('simulator'));
root.render(<Simulator />);