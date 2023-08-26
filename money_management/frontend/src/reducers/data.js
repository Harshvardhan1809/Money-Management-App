import { GET_RECENT_ADDITIONS, GET_CAROUSEL_DATA, GET_OVERVIEW_DATA, GET_OVERVIEW_GRAPH, POST_SPENDING } from "../actions/types.js"
import { eng_spending_choices } from "../../static/utilities/eng_spending_choices.js"

// for the carousel data we need a different structure  
const spending_keys = Object.keys(eng_spending_choices)
let carousel_spending = {}; 
for(let i=0; i<spending_keys.length; i++){
    carousel_spending[`${spending_keys[i]}`] = 0; 
}

// Default state for spendings
const initialComponentState = {
    user_data: [], 
    recent_spendings: [], 
    carousel_data : carousel_spending,
    overview_data : {},
    overview_graph : []
}

// For expenditure
const initialExpenditureState = {
    expenditure: []
}

// For account
const initialAccountState = {
    account: []
}

// For dummy blank state 
const initialCarouselState = {
    data: []
}

// Reducers
// Reducer for spendings
export default function(state = initialComponentState, action) {

    switch(action.type){
        case GET_RECENT_ADDITIONS: 

            return {
                ...state, 
                recent_spendings: action.payload 
            }  

        case GET_CAROUSEL_DATA: 

            console.log("Print the action.payload", action.payload)

            return {
                ...state, 
                carousel_data: action.payload 
            }

        case GET_OVERVIEW_DATA: 

            console.log("Print the action.payload for overview data", action.payload)

            return {
                ...state, 
                overview_data: action.payload 
            }

        case GET_OVERVIEW_GRAPH: 

            console.log("Print the action.payload for overview graph", action.payload)

            return {
                ...state, 
                overview_graph: action.payload 
            }

        case POST_SPENDING: 

            console.log("Print the action.payload for adding a spending", action.payload)

            return {
                ...state 
            }

        default:
            return state; 
    }

}