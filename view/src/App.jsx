import './app.css';
import { useEffect, useState, lazy, Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import BoxLoading from './domain/common/parts/BoxLoading';
import { ToastContainer } from 'react-toastify';
import { loadUser } from './redux/actions/authActions';
import setAuthToken from './redux/utils/setAuthToken';
import 'react-toastify/dist/ReactToastify.css';

// Component Imports

import Sidebar from './domain/navigation/Sidebar';
const Vanilla = lazy(() => import('./domain/compilers/pages/vanilla/Vanilla'));
import Home from './domain/user/pages/home/Home';
const ContactMe = lazy(() => import('./domain/user/pages/contactMe/ContactMe'));
const ProjectPlanner = lazy(() => import('./domain/project/pages/projectPlanner/ProjectPlanner'));
const Compiler = lazy(() => import('./domain/compilers/pages/liveCompiler/Compiler'));
import store from './redux/store';
import Landing from './domain/layouts/Landing';
import LandingRouteButton from './domain/layouts/components/LandingRouteButton';
import Register from './domain/auth/pages/Register';
import Login from './domain/auth/pages/Login';
const Todos = lazy(() => import('./domain/project/pages/toDoList/Todos'));

import { FallBackLayout } from './domain/layouts/FallBackLayout';

// Dev Styles

// import './domain/common/styles/general.css';
// import './domain/common/styles/partStyles/dfooter.css';
// import './domain/common/styles/partStyles/loader.css';
// import './domain/compilers/styles/pageStyles/vanilla.css';
// import './domain/compilers/styles/componentStyles/vanillaComponentStyles/vanillaFluent.css';
// import './domain/compilers/styles/componentStyles/vanillaComponentStyles/vanillaNormal.css';
// import './domain/compilers/styles/componentStyles/vanillaComponentStyles/vanillaRouteButton.css';
// import './domain/navigation/styles/pageStyles/navBar.css';
// import './domain/project/styles/pageStyles/projectPlanner.css';
// import './domain/project/styles/pageStyles/toDoList.css';
// import './domain/project/styles/componentStyles/projectPlannerComponentStyles/addList.css';
// import './domain/project/styles/componentStyles/projectPlannerComponentStyles/board.css';
// import './domain/project/styles/componentStyles/projectPlannerComponentStyles/card.css';
// import './domain/project/styles/componentStyles/projectPlannerComponentStyles/cardEditor.css';
// import './domain/project/styles/componentStyles/projectPlannerComponentStyles/editButtons.css';
// import './domain/project/styles/componentStyles/projectPlannerComponentStyles/list.css';
// import './domain/project/styles/componentStyles/projectPlannerComponentStyles/listEditor.css';
// import './domain/user/styles/pageStyles/contactMe.css';
// import './domain/user/styles/pageStyles/home.css';
// import './domain/user/styles/componentStyles/homeComponentStyles/heroStyles.css';
// import './domain/user/styles/componentStyles/homeComponentStyles/mainOneStyles.css';
// import './domain/user/styles/componentStyles/homeComponentStyles/mainTwoStyles.css';
// import './domain/layouts/styles/landing.css';
// import './domain/layouts/styles/landingRouteButton.css';

// Loader Section

// Auth Section
if (store.getState().auth.token) {
  setAuthToken(store.getState().auth.token);
}

const App = ({ isAuthenticated }) => {
  // state hooks
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(undefined);
  const [completed, setcompleted] = useState(undefined);
  const dispatch = useDispatch();

  // const mystyle = {
  //   fontSize: '5vh',
  // };

  useEffect(() => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          setloading(true);

          setTimeout(() => {
            setcompleted(true);
          }, 2000);
        })
        .catch((err) => console.log(err));
    }, 2000);
  }, [setData]);

  useEffect(() => {
    store.dispatch(loadUser());
  }, [dispatch]);

  const errorHandler = (error, errorInfo) => {
    console.log(`${error}:${errorInfo}`);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {!completed ? (
        <section className='loading'>
          {!loading ? (
            <BoxLoading />
          ) : (
            <svg
              className='tickSvg'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 130.2 130.2'
            >
              <circle
                class='path circle'
                fill='none'
                stroke='#73AF55'
                stroke-width='6'
                stroke-miterlimit='10'
                cx='65.1'
                cy='65.1'
                r='62.1'
              />
              <polyline
                class='path check'
                fill='none'
                stroke='#73AF55'
                stroke-width='6'
                stroke-linecap='round'
                stroke-miterlimit='10'
                points='100.2,40.2 51.5,88.8 29.8,67.5 '
              />
            </svg>
          )}
        </section>
      ) : (
        <>
          {store.getState().auth.token !== null || localStorage.getItem('authType') === 'Google' ? (
            <Router>
              <ErrorBoundary FallbackComponent={FallBackLayout} onError={errorHandler}>
                <ToastContainer />
                <Sidebar />

                <Switch>
                  <Route exact path='/' to component={Home} />
                  <Route exact path='/vanilla' to component={Vanilla} />
                  <Route exact path='/compiler' to component={Compiler} />
                  <Route exact path='/contact' to component={ContactMe} />
                  <Route exact path='/proj' to component={ProjectPlanner} />
                  <Route exact path='/todo' to component={Todos} />
                </Switch>
              </ErrorBoundary>
            </Router>
          ) : (
            <Router>
              <ErrorBoundary FallbackComponent={FallBackLayout} onError={errorHandler}>
                {' '}
                <ToastContainer />
                <LandingRouteButton />
                <Switch>
                  <Route exact path='/' to component={Landing} />
                  <Route exact path='/register' to component={Register} />
                  <Route exact path='/login' to component={Login} />
                </Switch>
              </ErrorBoundary>
            </Router>
          )}
        </>
      )}
    </Suspense>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default App;
