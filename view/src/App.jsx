import './app.css';
import { useEffect, useState, lazy, Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import { ToastContainer } from 'react-toastify';
import { loadUser } from './redux/actions/authActions';
import setAuthToken from './redux/utils/setAuthToken';
import * as location from './1055-world-locations.json';
import * as success from './1127-success.json';
import 'react-toastify/dist/ReactToastify.css';

//  <ErrorBoundry FallbackComponent={FallBackLayout} onError={errorHandler}>

// Component Imports

import Sidebar from './domain/navigation/Sidebar';
const Vanilla = lazy(() => import('./domain/compilers/pages/vanilla/Vanilla'));
const Home = lazy(() => import('./domain/user/pages/home/Home'));
const ContactMe = lazy(() => import('./domain/user/pages/contactMe/ContactMe'));
const ProjectPlanner = lazy(() => import('./domain/project/pages/projectPlanner/ProjectPlanner'));
const Compiler = lazy(() => import('./domain/compilers/pages/liveCompiler/Compiler'));
import store from './redux/store';
const Landing = lazy(() => import('./domain/layouts/Landing'));
const LandingRouteButton = lazy(() => import('./domain/layouts/components/LandingRouteButton'));
const Register = lazy(() => import('./domain/auth/pages/Register'));
const Login = lazy(() => import('./domain/auth/pages/Login'));
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
            <Lottie options={defaultOptions1} height={700} width={700} />
          ) : (
            <Lottie options={defaultOptions2} height={400} width={400} />
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
