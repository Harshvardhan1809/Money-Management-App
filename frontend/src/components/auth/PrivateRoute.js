import React from 'react'
import {Route, Routes, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// component loads the component sent while calling PrivateRoute
// auth from redux shows the auth state. In the store, the auth state is there, from there we are picking it up
// if any other props, use the rest operator

const PrivateRoute = ({component: Component, auth, ...rest}) => (
        <Routes>
            <Route {...rest} render={
                props => {
                    if(auth.isLoading) return <h2>Loading...</h2>
                    else if(!auth.isAuthenticated) return <Redirect to="/login" />
                    else return <Component {...props} />
                }
            }/>
        </Routes>
)

// map state to the props
// this is a function (??)
const mapStateToProps = state =>({
    auth: state.auth
    
})

// connect to the component
export default connect(mapStateToProps)(PrivateRoute); 
