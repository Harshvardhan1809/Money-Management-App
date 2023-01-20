import { GET_SPENDINGS } from "../actions/types.js"

// Default state for spendings
const initialSpendingsState = {
    spendings: []
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


// Reducers

// Reducer for spendings
export default function(state = initialSpendingsState, action) {

    switch(action.type){
        case GET_SPENDINGS: 
            return {
                ...state, 
                spendings: action.payload 
            }  

        default:
            return state; 
    }

}