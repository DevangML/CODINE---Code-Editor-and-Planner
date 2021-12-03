// import './app.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Lottie from 'react-lottie';
import * as location from './1055-world-locations.json';
import * as success from './1127-success.json';

// Component Imports

import Sidebar from './domain/navigation/Sidebar';
import Vanilla from './domain/compilers/pages/vanilla/Vanilla';
import Home from './domain/user/pages/home/Home';
import ContactMe from './domain/user/pages/contactMe/ContactMe';
import ProjectPlanner from './domain/project/pages/projectPlanner/ProjectPlanner';
import LiveCompiler from './domain/compilers/pages/liveCompiler/LiveCompiler';
import ToDoList from './domain/project/pages/toDoList/ToDoList';
import Auth from './domain/auth/pages/Auth';

// Dev Styles

import './domain/common/styles/general.css';
import './domain/common/styles/partStyles/dfooter.css';
import './domain/common/styles/partStyles/loader.css';
import './domain/compilers/styles/pageStyles/liveCompiler.css';
import './domain/compilers/styles/pageStyles/vanilla.css';
import './domain/compilers/styles/componentStyles/vanillaComponentStyles/vanillaFluent.css';
import './domain/compilers/styles/componentStyles/vanillaComponentStyles/vanillaNormal.css';
import './domain/compilers/styles/componentStyles/vanillaComponentStyles/vanillaRouteButton.css';
import './domain/navigation/styles/pageStyles/navBar.css';
import './domain/project/styles/pageStyles/projectPlanner.css';
import './domain/project/styles/pageStyles/toDoList.css';
import './domain/project/styles/componentStyles/projectPlannerComponentStyles/addList.css';
import './domain/project/styles/componentStyles/projectPlannerComponentStyles/board.css';
import './domain/project/styles/componentStyles/projectPlannerComponentStyles/card.css';
import './domain/project/styles/componentStyles/projectPlannerComponentStyles/cardEditor.css';
import './domain/project/styles/componentStyles/projectPlannerComponentStyles/editButtons.css';
import './domain/project/styles/componentStyles/projectPlannerComponentStyles/list.css';
import './domain/project/styles/componentStyles/projectPlannerComponentStyles/listEditor.css';
import './domain/user/styles/pageStyles/contactMe.css';
import './domain/user/styles/pageStyles/home.css';
import './domain/user/styles/componentStyles/homeComponentStyles/heroStyles.css';
import './domain/user/styles/componentStyles/homeComponentStyles/mainOneStyles.css';
import './domain/user/styles/componentStyles/homeComponentStyles/mainTwoStyles.css';
import './domain/auth/styles/auth.css';
import './domain/auth/styles/input.css';

// Loader Section

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const App = function () {
  // state hooks
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(undefined);
  const [completed, setcompleted] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          setloading(true);

          setTimeout(() => {
            setcompleted(true);
          }, 1000);
        });
    }, 2000);
  }, [setData]);
  return (
    <>
      {!completed ? (
        <section className='loading'>
          {!loading ? (
            <Lottie options={defaultOptions1} height={700} width={700} />
          ) : (
            <Lottie options={defaultOptions2} height={400} width={400} />
          )}
        </section>
      ) : (
        <Router>
          <Sidebar />
          <Switch>
            <Route exact path='/' to component={Home} />
            <Route exact path='/vanilla' to component={Vanilla} />
            <Route exact path='/compiler' to component={LiveCompiler} />
            <Route exact path='/contact' to component={ContactMe} />
            <Route exact path='/proj' to component={ProjectPlanner} />
            <Route exact path='/todo' to component={ToDoList} />
            <Route exact path='/auth' to component={Auth} />
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
