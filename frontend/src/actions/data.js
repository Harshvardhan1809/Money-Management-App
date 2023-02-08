import { faObjectGroup } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import { eng_spending_choices } from "../../static/utilities/eng_spending_choices";

import { GET_RECENT_ADDITIONS, GET_CAROUSEL_DATA, GET_OVERVIEW_GRAPH, GET_OVERVIEW_DATA } from "./types"

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

export const getOverviewData = () => (dispatch, getState) => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const token = getState().auth.token; 
    if(token){
        config.headers['Authorization'] = `Token ${token}`; 
    }

    axios.get('api/spending_data/overview_data', config)
    .then(res => {

        let payload = res.data; 

        console.log("Print the payload for overview data")
        console.log(payload)

        dispatch({
            type: GET_OVERVIEW_DATA,
            payload: payload
        })

    })
    .catch(err => console.log("Error occured for overview data", err.message))

}

export const getOverviewGraph = () => (dispatch, getState) => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const token = getState().auth.token; 
    if(token){
        config.headers['Authorization'] = `Token ${token}`; 
    }

    axios.get('api/spending_data/overview_graph', config)
    .then(res => {

        let payload_initial = res.data; 
        let payload_mid = []; 
        let payload = []; 

        for(let i=0; i<payload_initial.length; i++){
            payload_mid[i] = payload_initial[i].fields
        }

        // generate an object similar to the state for carousel data
        // lousy and redundant code. can be improved 
        const spending_keys = Object.keys(eng_spending_choices)
        for(let i=0; i<spending_keys.length; i++){
            payload[`${spending_keys[i]}`] = 0; 
        }
        for(let i=0; i<payload_mid.length; i++){
            payload[`${payload_mid[i].type1}`] += +payload_mid[i].amount
        }

        for(let i=0; i<spending_keys.length; i++){
            if(payload[`${spending_keys[i]}`] != 0){
                let obj = {};
                obj['name'] = `${spending_keys[i]}`
                obj['value'] = payload[`${spending_keys[i]}`]
                payload.push(obj)
            }
        }

        dispatch({
            type: GET_OVERVIEW_GRAPH,
            payload: payload
        })

    })
    .catch(err => console.log("Error occured for overview graph", err.message))

}