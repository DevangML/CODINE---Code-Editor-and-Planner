<<<<<<< HEAD
import React from 'react';
=======
>>>>>>> origin/development
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import './index.css';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
<<<<<<< HEAD
  rootElement
);
=======
  rootElement,
);

// serviceWorker.register();
>>>>>>> origin/development
