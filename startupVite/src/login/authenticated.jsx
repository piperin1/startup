import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/secure/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <div>
      <div className='playerName'>Welcome {props.userName}</div>
      <p id="button" className="click" onClick={() => navigate('/home')}>
        Play
      </p>
      <p id="button" className="click" onClick={() => logout()}>
        Logout
      </p>
    </div>
  );
}
