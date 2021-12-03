import { Link } from 'react-router-dom';

const VanillaRouteButton = () => (
  <section className='vanilla_button'>
    <button className='vanilla_button__item-1'>
      <Link to='/nvanilla'>Normal UI</Link>
    </button>

    <button className='vanilla_button__item-2'>
      <Link to='/fvanilla'>Fluent UI</Link>
    </button>
  </section>
);

export default VanillaRouteButton;
