import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './modules';
import thunk from 'redux-thunk';
import { fetchDataAction } from './middlewares/api';
import log from './middlewares/log';

let composeEnhancers;
if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}
else {
    composeEnhancers = compose;
}
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, log, fetchDataAction)));
export default store;