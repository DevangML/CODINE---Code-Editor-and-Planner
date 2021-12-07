import { Link } from 'react-router-dom';

const LandingRouteButton = () => (
  <section className='landing_button'>
    <Link className='landing_button__item-1' to='/register'>
      Register
    </Link>

    <Link className='landing_button__item-2' to='/login'>
      Login
    </Link>
  </section>
);

export default LandingRouteButton;
