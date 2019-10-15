import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import App from './components/App/App';
import './index.css';

import reducers from './reducers';

const storeWithMIddleware = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
  <Provider store={storeWithMIddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
