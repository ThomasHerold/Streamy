import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.querySelector('#root')
);

/* With React-Router, we need to be sure that each component can fetch the data it needs so they can work in isolation. 
   One component should not be dependent on another to work should a user ever need to access a page directly.
*/ 