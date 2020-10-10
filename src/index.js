import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import reducer from './store/reducers/reducers';
import authReducer from './store/reducers/auth';
import feedReducer from './store/reducers/feed';
import accountReducer from './store/reducers/account';
import exploreReducer from './store/reducers/explore';

import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth:authReducer,
    feed:feedReducer,
    reducer:reducer,
    account:accountReducer,
    explore:exploreReducer,
});
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
const app = (
    <Provider store = {store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
