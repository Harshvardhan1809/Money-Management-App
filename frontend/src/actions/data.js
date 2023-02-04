import { faObjectGroup } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import { eng_spending_choices } from "../../static/utilities/eng_spending_choices";

import { GET_RECENT_ADDITIONS, GET_CAROUSEL_DATA } from "./types"

const moment = require('moment');

// GET_RECENT_ADDITIONS
export const getRecentAdditions = () => (dispatch, getState) => {

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
    axios.get('api/spending_data/recent_additions', config, {
        params: {
            _limit: 10, 
        }
    })
        .then(res => {

            let payload_initial = res.data; 
            // res.data is basically an array of objects
            // the component data should be an array of objects, where each spending is an object
            let payload = []

            for(let i=0; i<payload_initial.length; i++){
                payload[i] = payload_initial[i].fields
            }

            // Make sure only 10 objects are sent 
            if(res.data.length > 10) payload = res.data.spendings.slice(0,10)
               
            dispatch({
                type: GET_RECENT_ADDITIONS,
                payload: payload
            })
        })
        .catch(err => console.log("Error occured in recent additions ", err.message))

}

// moment().get('month'); 
// get the current month, get

// GET CAROUSEL_DATA
export const getCarouselData = () => (dispatch, getState) => {

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
    axios.get('api/spending_data/carousel', config)
    .then(res => {

        let payload_initial = res.data; 
        let payload_mid = []; 
        let payload = {}; 

        for(let i=0; i<payload_initial.length; i++){
            payload_mid[i] = payload_initial[i].fields
        }

        // generate an object similar to the state for carousel data
        const spending_keys = Object.keys(eng_spending_choices)
        for(let i=0; i<spending_keys.length; i++){
            payload[`${spending_keys[i]}`] = 0; 
        }
        for(let i=0; i<payload_mid.length; i++){
            payload[`${payload_mid[i].type1}`] += +payload_mid[i].amount
        }

        dispatch({
            type: GET_CAROUSEL_DATA,
            payload: payload
        })

    })
    .catch(err => console.log("Error occured for carousel", err.message))

}