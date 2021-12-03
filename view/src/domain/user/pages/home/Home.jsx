import HeroSection from './components/HeroSection';
import Main1 from './components/Main1';
import Main2 from './components/Main2';
import Dfooter from '../../../common/parts/Dfooter';

const Home = () => (
  <section className='home'>
    <HeroSection />
    <main className='home__main'>
      <Main1 />
      <Main2 />
    </main>
    <Dfooter />
  </section>
);

export default Home;
