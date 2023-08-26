import React,{Fragment} from 'react'
import {HashRouter as Router, Route, Routes, Redirect} from 'react-router-dom'
import Register from '../auth/Register'
import Login from '../auth/Login'

export class Routing extends React.Component {

  render(){

    return (
      <Fragment>
          <Routes>
              <Route exact path="register" element={<Register />} />
              <Route exact path="login" element={<Login />} />
          </Routes>
      </Fragment>
    )

  }
}

export default Routing; 


//  Important difference between HashRouter and BrowserRouter regarding Routes
// https://stackoverflow.com/questions/51974369/what-is-the-difference-between-hashrouter-and-browserrouter-in-react 
// React only reads after the #. For url http://127.0.0.1:8000/register , the # is placed at the end 

// Routes for components (HashRouter)
// Register http://127.0.0.1:8000/#/register
