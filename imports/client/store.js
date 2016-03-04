import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { appReducer } from './reducers.js';

const logger = createLogger();
const store = createStore(
    appReducer,
    applyMiddleware(logger)
);

export { store } ;