import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware,compose, combineReducers} from 'redux';
import reducerArticolo from './store/reducers/reducerArticolo';
import reducerLogin from './store/reducers/reducerLogin';

const composeEnhancers = process.env.NODE_ENV === 'development' ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null|| compose;

const rootReducer = combineReducers(
    {
        articolo : reducerArticolo,
        login: reducerLogin
    }
);
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store = {store}>
    <App/>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
