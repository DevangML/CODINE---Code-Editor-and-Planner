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
          <h1>MERN Project</h1>
          <p>Register, Login &amp; Logout Functionality with MERN</p>
          <br />
          <Router>
            <LandingRouteButton />
            <Switch>
              <Route exact path='/register' to component={Register} />
              <Route exact path='/login' to component={Login} />
            </Switch>
          </Router>
        </div>
      </div>
    </section>
  );
};

export default Landing;
