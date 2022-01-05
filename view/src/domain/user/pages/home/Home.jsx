import { ErrorBoundary } from 'react-error-boundary';
import HeroSection from './components/HeroSection';
import Main1 from './components/Main1';
import Main2 from './components/Main2';
import Dfooter from '../../../common/parts/Dfooter';
import { errorHandler } from '../../../../utils/errorHandler';
import { FallBackLayout } from '../../../layouts/FallBackLayout';

const Home = function () {
  return (
    <ErrorBoundary FallbackComponent={FallBackLayout} onError={errorHandler}>
      <section className='home'>
        <HeroSection />
        <main className='home__main'>
          <Main1 />
          <Main2 />
        </main>
        <Dfooter />
      </section>
    </ErrorBoundary>
  );
};

export default Home;
