import Typed from 'react-typed';

const HeroSection = function () {
  return (
    <section className='hero'>
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1 className='hero__item-1'>CODINE</h1>
      <br />
      <Typed strings={['Coding Web App']} typeSpeed={44} loop className='hero__item-2' />
    </section>
  );
};

export default HeroSection;
