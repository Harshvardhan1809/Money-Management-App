import React, {Component, Fragment} from 'react'; 
import ReactDOM from 'react-dom'; 
import {HashRouter as Router, Route, Routes, Redirect} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
//import { fab } from '@fortawesome/free-brands-svg-icons'

import Dashboard from './layout/Dashboard';
import Routing from './utilities/Routing'
import PrivateRoute from './auth/PrivateRoute'

import Register from './auth/Register'
import Login from './auth/Login'

import {Provider} from 'react-redux' // connects the redux stuff to React app
import PropTypes from 'prop-types'
import store from '../store'

import { loadUser } from '../actions/auth';

// Explicitly import and add the specific icons you will use throughout the App
import { faUtensils, faBoxTissue, faFilm, faTrain, faShirt, faUsers, faKitMedical, faBookOpen, faMoneyBill1Wave, faQuestion } from '@fortawesome/free-solid-svg-icons'
// FontAwesome library
library.add(faUtensils, faBoxTissue, faFilm, faTrain, faShirt, faUsers, faKitMedical, faBookOpen, faMoneyBill1Wave, faQuestion) 

class App extends Component {

    // This doesn't work
    // componentDidMount(){
    //     if(store.getState.auth?.token != null){
    //         this.props.loadUser(); 
    //     }
    // }

    componentDidMount(){
        store.dispatch(loadUser()); 
    }

    render(){
        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Routes>
                            <Route element={<PrivateRoute />} >
                                <Route exact path="/front" element={<Dashboard />} />
                            </Route>
                            <Route exact path="/register" element={<Register />} />
                            <Route exact path="/login" element={<Login />} />
                        </Routes>
                    </Fragment> 
                </Router>
            </Provider>
        )
    }
}



ReactDOM.render(<App />, document.getElementById('app')); 
// Insert app in an element with id 'app'

// The apparently "perfect" size of the navbar is the result of 
// the media queries generated by nabar class



