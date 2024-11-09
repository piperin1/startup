import './home.css';
import {NavLink} from 'react-router-dom';

function Login() {
    return (
        <>
            <div>
            <section class="column">
            <h2 id="loginTitle">Login</h2>
            <div><input type="Username" placeholder="username"></input></div>
            <div><input type="Password" placeholder="password"></input></div>
            <NavLink id="button" to="/home">Continue</NavLink>
            </section> 
            </div> 
        </>  
    );
  }

export default Login;
