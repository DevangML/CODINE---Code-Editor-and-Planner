import React, { useState } from 'react';
import Dfooter from '../../parts/Dfooter';
import Board from './components/Board';

const ProjectPlanner = function () {
  const [state, setState] = useState(0);

  return (
    <section className='proj'>
      <header className='proj__header'>
        <h1 className='proj__header__item'>Project Manager</h1>
      </header>
      <br />
      <main className='proj__main'>
        <button className='proj__button' onClick={() => setState(state + 1)}>
          Click Here To Start Planning Projects
        </button>
        <section className='boardWrapper'>
          {state > 0 && <Board />}
          {state > 1 && <Board />}
          {state > 2 && <Board />}
          {state > 3 && <Board />}
          {state > 4 && <Board />}
          {state > 5 && <Board />}
          {state > 6 && <Board />}
          {state > 7 && <Board />}
          {state > 8 && <Board />}
          {state > 9 && <Board />}
          {state > 10 && <Board />}
        </section>
      </main>
      <Dfooter />
    </section>
  );
};

export default ProjectPlanner;
