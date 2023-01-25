import {combineReducers} from 'redux'
import data from './data'
import auth from './auth'

// reducers alter the state based on the action 

export default combineReducers({
    data, 
    auth
}); 