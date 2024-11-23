import Simulator from './sim.jsx'
import {Login} from './login/login.jsx'
import React from 'react';
import MockWeather from './mockup.jsx';
import { AuthState } from './login/authState';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import './home.css'

function Main () {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return(
    <BrowserRouter>
        <div>
            <header>
                <h1><div className="left"><NavLink to='/'>MyPet Login</NavLink></div>
                    <div className="center">{authState === AuthState.Authenticated && userName}</div>
                    <div className="right">By Piper Dickson</div>
                </h1>
            </header>
                <Routes>
                    <Route path="/" element={
                        <Login
                          userName={userName}
                          authState={authState}
                          onAuthChange={(userName, authState) => {
                            setAuthState(authState);
                            setUserName(userName);
                          }}
                        />
                      }
                    exact/>
                    <Route path="/home" element={<Simulator/>} />
                </Routes>
          <footer>
            <div className="left_foot">Weather Status:{<MockWeather/>}</div>
            <div className="right_foot"><a href="https://github.com/piperin1/startup">Repo Link (Github)</a></div>
          </footer>

        </div>
  </BrowserRouter>
    )
}

export default Main;