
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'

import thunk from 'redux-thunk'

// Looks for the file index.js in the folder reducers
import rootReducer from './reducers'


const initialState = {};

// Remember thunk handles the middleware
const middleware = [thunk]; 

// To create the store, pass an empty object, reducers, middlewares
const store = createStore(
    rootReducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store; 