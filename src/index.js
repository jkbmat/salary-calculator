import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable'

import {Provider} from 'react-redux'
import {compose, applyMiddleware, createStore} from 'redux'
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'

import App from './components/App';
import reducer, {defaultState} from './reducers'

import checkInvalidateLS from './checkInvalidateLS';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const lsConfig = {
  deserialize: (serializedState) => Immutable.fromJS(JSON.parse(serializedState)),
  merge: (initialState, persistedState) => initialState.mergeDeep(persistedState)
}


checkInvalidateLS()


const store = createStore(reducer, defaultState, compose(applyMiddleware(thunk), persistState(null, lsConfig)))

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
