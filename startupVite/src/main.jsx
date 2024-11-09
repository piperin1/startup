import Simulator from './sim.jsx'
import Login from './login.jsx'
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import './home.css'

function Main () {
    return(
    <BrowserRouter>
        <body>
            <header>
                <h1><div class="left"><NavLink to='/'>MyPet Login</NavLink></div>
                    <div class="center">Username</div>
                    <div class="right">By Piper Dickson</div>
                </h1>
            </header>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/home" element={<Simulator/>} />
                </Routes>
          <footer>
            <div class="left_foot">Weather Status (External API Placeholder)</div>
            <div class="right_foot"><a href="https://github.com/piperin1/startup">Repo Link (Github)</a></div>
          </footer>

        </body>
  </BrowserRouter>
    )
}

export default Main;