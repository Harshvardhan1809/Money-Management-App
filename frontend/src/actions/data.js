import axios from "axios"

import { GET_SPENDINGS } from "./types"

// GET_SPENDINGS
export const getSpendings = () => dispatch => {

    axios.get('api/spending/')
        .then(res => {
            dispatch({
                type: GET_SPENDINGS,
                payload: res.data
            })
        })
        .catch(err => console.log("Error occured"))

}