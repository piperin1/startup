import { useState, useEffect } from 'react'
import eatAnim from './animations/eat_anim.gif'
import idleAnim from './animations/idle_anim.gif'
import './home.css'

function Simulator() {

  const [hunger, setHunger] = useState(() => parseInt(localStorage.getItem('hunger')) || 0);
  const [happiness, setHappiness] = useState(() => parseInt(localStorage.getItem('happiness')) || 0);
   
  const [isEating, setIsEating] = useState(false);
  const [isBeingPet, setIsBeingPet] = useState(false);

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
  }, [hunger, happiness]);

  const handleFeed = () => {
    if (isEating || isBeingPet) return;
    setHunger(Math.min(hunger + 10, 100)); 
    setIsEating(true);
    setTimeout(() => setIsEating(false), 2000);
  }

  const handlePet = () => {
    if (isEating || isBeingPet) return;
    setHappiness(Math.min(happiness + 10, 100));
    setIsBeingPet(true);
    setTimeout(() => setIsBeingPet(false), 2000);
  }

  const handleAnim = () => {
    if (isEating) return eatAnim;
    if (isBeingPet) return eatAnim;
    return idleAnim;
  }

  return (
    <>
      <div id="simulator" class="row">
        <div id="col1" class = "column">
          <h3>actions</h3>
          <p id="button" class="click" onClick={handleFeed}>feed</p>
          <p id="button" class="click" onClick={handlePet}>pet</p>
        </div>
        <div id= "col2" class="column">
          <img alt="pet idle animation" src={handleAnim()} height="300" width="275"/>
          <h3>pet name | lvl __</h3>
        </div>
        <div id= "col3" class="column">
          <h3>stats</h3>
          <p id="button">{hunger}</p>
          <p id="button">{happiness}</p>
      </div>
      </div>
    </>
  )
}

export default Simulator
