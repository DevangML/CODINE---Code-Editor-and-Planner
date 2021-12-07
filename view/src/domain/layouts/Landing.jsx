/* eslint-disable arrow-body-style */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../auth/pages/Login';
import Register from '../auth/pages/Register';
import LandingRouteButton from './components/LandingRouteButton';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1>CODEX</h1>
          <p>Code Editor and Planner</p>
          <br />
        </div>
      </div>
    </section>
  );
};

export default Landing;
