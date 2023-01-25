import axios from 'axios'

import {USER_LOADED,USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS} from '../actions/types'

    // // dispatch is a function of Redux which manipulates the store (based on the action)
    // // can be called in component using this.props.dispatch because connect() connects component/prop to state

// CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {

    dispatch({
        type: USER_LOADING
    })    

    const token = getState().auth.token; 

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    if(token){
        config.headers['Authorization'] = `Token ${token}`; 
    }

    axios.get('api/auth/user', config)
    .then(res => {
        dispatch({
            type: USER_LOADED, 
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: AUTH_ERROR
        })
    })

}

// LOGIN USER 
export const login = (email, password) => dispatch => {

    // send a request
    const config = {
        headers: {
            'Content-type' : 'application/json'
        }
    }

    // Body of the request
    // convert Javascript value to JSON string
    const body = JSON.stringify({email, password})
    console.log(body)

    // send request
    axios.post('api/auth/login', body, config)
    .then(res => {
        dispatch({
            type: LOGIN_SUCCESS, 
            payload: res.data
        })
    })
    .catch((err) => {
        console.log(err.request)
        console.log(err.message)
        dispatch({
            type: LOGIN_FAIL
        })
    })
}

// REGISTER USER

// LOGOUT USER
export const logout = () => (dispatch, getState) => {

    // take the token from the state
    const token = getState().auth.token; 

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    if(token){
        config.headers['Authorization'] = `Token ${token}`; 
    }

    axios.post('api/auth/logout', null, config)
    .then(res => {
        dispatch({
            type: LOGOUT_SUCCESS
        })
    })
    .catch(err=>{
        // if the token doesnt match 
        console.log(err); 
        // dispatch(returnErrors(err.response.data, err.response.status)); 
    })
}