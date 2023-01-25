import axios from "axios"

import { GET_RECENT_ADDITIONS, GET_CAROUSEL_DATA } from "./types"

const moment = require('moment');
import {default as dt} from "py-datetime";

// GET_RECENT_ADDITIONS
export const getRecentAdditions = () => dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const token = getState().auth.token; 
    if(token){
        config.headers['Authorization'] = `Token ${token}`; 
    }

    // set params to get only 10 data
    axios.get('api/spending/', config, {
        params: {
            _limit: 10, 
        }
    })
        .then(res => {

            // Limit the number of recent additions to 10 
            let payload = res.data; 
            if(res.data.length > 10) payload = res.data.spendings.slice(0,10)
               
            dispatch({
                type: GET_RECENT_ADDITIONS,
                payload: payload
            })
        })
        .catch(err => console.log("Error occured"))

}

// moment().get('month'); 
// get the current month, get

// GET CAROUSEL_DATA
export const getCarouselData = () => dispatch => {

    // set params to get only 10 data
    axios.get('api/spending/', config, {
        params: {
            date: 10, 
            expenditure, 
        }
    })
        .then(res => {

            // Limit the number of recent additions to 10 
            let payload = res.data; 
            if(res.data.length > 10) payload = res.data.spendings.slice(0,10)
               
            dispatch({
                type: GET_RECENT_ADDITIONS,
                payload: payload
            })
        })
        .catch(err => console.log("Error occured"))

}