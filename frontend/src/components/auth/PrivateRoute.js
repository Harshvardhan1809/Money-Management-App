import React, {useState} from 'react'
import {Route, Routes, Navigate, Outlet} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import store from '../../store'

const PrivateRoute = () => {

    const globalStore = store.getState(); 

    console.log("Printing the store"); 
    console.log("Printing the" , globalStore, "store"); 

    if (globalStore.auth.isLoading) return <h2>Loading...</h2>
    else if(!globalStore.auth.isAuthenticated) {

        return <Navigate to="/login" />
    }
    else {
        console.log("daf")
        return <Outlet/>
    }

}

export default PrivateRoute; 
