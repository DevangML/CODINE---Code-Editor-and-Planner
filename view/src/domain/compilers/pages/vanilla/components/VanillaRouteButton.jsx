import { Link } from 'react-router-dom';

const VanillaRouteButton = function () {
  return (
    <section className='vanilla_button'>
      <button className='vanilla_button__item-1' aria-labelledby='normalButton'>
        <Link to='/nvanilla'>
          <label id='normalButton'>Normal UI</label>
        </Link>
      </button>

      <button className='vanilla_button__item-2' aria-labelledby='fluentButton'>
        <Link to='/fvanilla'>
          {' '}
          <label id='fluentButton'>Fluent UI</label>{' '}
        </Link>
      </button>
    </section>
  );
};

export default VanillaRouteButton;
