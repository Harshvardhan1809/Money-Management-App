import { GET_RECENT_ADDITIONS, GET_CAROUSEL_DATA } from "../actions/types.js"

// Default state for spendings
const initialComponentState = {
    user_data: [], 
    recent_spendings: [], 
    carousel_spendings : []
}

// For expenditure
const initialExpenditureState = {
    expenditure: []
}

// For account
const initialAccountState = {
    account: []
}

// For user
const initialUserState = {
    account: []
}

// For dummy blank state 
const dummyBlank = {
    data: []
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

            return {
                ...state, 
                carousel_spendings: action.payload 
            }

        default:
            return state; 
    }

}