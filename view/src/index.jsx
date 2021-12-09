/* eslint-disable import/no-import-module-exports */
/* eslint-disable global-require */

import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import './index.css';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

// serviceWorker.register();
