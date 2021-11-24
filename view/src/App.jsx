<<<<<<< HEAD
// import './app.css'
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Lottie from 'react-lottie';
import Sidebar from './pages/generalComponents/Sidebar';
import Vanilla from './pages/vanilla/Vanilla';
import Home from './pages/home/Home';
import Oop from './pages/oop/Oop';
import Pop from './pages/pop/Pop';
import ContactMe from './pages/contactMe/ContactMe';
import ProjectPlanner from './pages/projectPlanner/ProjectPlanner';
import * as location from './1055-world-locations.json';
import * as success from './1127-success.json';

// Dev Styles

import './styles/componentStyles/genralComponentStyles/dfooter.css';
import './styles/componentStyles/genralComponentStyles/navBar.css';
import './styles/componentStyles/projectPlannerComponentStyles/addList.css';
import './styles/componentStyles/projectPlannerComponentStyles/board.css';
import './styles/componentStyles/projectPlannerComponentStyles/card.css';
import './styles/componentStyles/projectPlannerComponentStyles/cardEditor.css';
import './styles/componentStyles/projectPlannerComponentStyles/editButtons.css';
import './styles/componentStyles/projectPlannerComponentStyles/list.css';
import './styles/componentStyles/projectPlannerComponentStyles/listEditor.css';
import './styles/pageStyles/home.css';
import './styles/componentStyles/homeComponentStyles/heroStyles.css';
import './styles/componentStyles/homeComponentStyles/mainOneStyles.css';
import './styles/componentStyles/homeComponentStyles/mainTwoStyles.css';
import './styles/pageStyles/projectPlanner.css';
import './styles/pageStyles/vanilla.css';
import './styles/componentStyles/vanillaComponentStyles/vanillaNormal.css';
import './styles/componentStyles/vanillaComponentStyles/vanillaFluent.css';
import './styles/componentStyles/vanillaComponentStyles/vanillaRouteButton.css';
import './styles/pageStyles/contactMe.css';
import './styles/general.css';
=======
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
>>>>>>> origin/development

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
<<<<<<< HEAD
=======
  // state hooks
  // eslint-disable-next-line no-unused-vars
>>>>>>> origin/development
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(undefined);
  const [completed, setcompleted] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => {
<<<<<<< HEAD
          console.log(json);
=======
>>>>>>> origin/development
          setData(json);
          setloading(true);

          setTimeout(() => {
            setcompleted(true);
          }, 1000);
        });
    }, 2000);
<<<<<<< HEAD
  }, []);
  return (
    <>
      {!completed ? (
        <section className="loading">
=======
  }, [setData]);
  return (
    <>
      {!completed ? (
        <section className='loading'>
>>>>>>> origin/development
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
<<<<<<< HEAD
            <Route exact path="/" to component={Home} />
            <Route exact path="/vanilla" to component={Vanilla} />
            <Route exact path="/pop" to component={Pop} />
            <Route exact path="/oop" to component={Oop} />
            <Route exact path="/contact" to component={ContactMe} />
            <Route exact path="/proj" to component={ProjectPlanner} />
=======
            <Route exact path='/' to component={Home} />
            <Route exact path='/vanilla' to component={Vanilla} />
            <Route exact path='/compiler' to component={LiveCompiler} />
            <Route exact path='/contact' to component={ContactMe} />
            <Route exact path='/proj' to component={ProjectPlanner} />
            <Route exact path='/todo' to component={ToDoList} />
>>>>>>> origin/development
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
