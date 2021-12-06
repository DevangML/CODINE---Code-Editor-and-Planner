import { Link } from 'react-router-dom';

const VanillaRouteButton = () => (
  <section className='landing_button'>
    <button className='landing_button__item-1'>
      <Link to='/register'>Register</Link>
    </button>

    <button className='landing_button__item-2'>
      <Link to='/login'>Login</Link>
    </button>
  </section>
);

export default VanillaRouteButton;
