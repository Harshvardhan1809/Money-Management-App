import React, { Component } from 'react'
import {Route, Routes, Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'
// proptypes essentially typechecks the attributes of the things passed to props

export class Login extends Component {

    // State to pass to redux 
    state = {
        username: "",
        password: ""
    }

    static propTypes = {
        login: PropTypes.func.isRequired, 
        isAuthenticated: PropTypes.bool
    }

    onSubmit = (e) => {
        e.preventDefault(); 
        console.log("Submit")
        this.props.login(this.state.username, this.state.password);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {

        if(this.props.isAuthenticated){
             return <Redirect to="/" />; 
        }

        const { username, password } = this.state; 

        return (
            <main className="font-mulish">
                <section className="wrapper h-screen w-screen bg-cover bg-center grayscale saturate-0" style={{backgroundImage: "url(static/img/signup.jpg)"}}>
                    <div className="flex wrapper h-full  bg-gray-700 bg-opacity-70 items-center justify-center">
                        <div className="bg-black text-slate-200 px-10 py-12 rounded-[10px]">
                            <div className="flex flex-col">
                                <div className="text-2xl mx-auto mb-5">Login</div>
                                <div className="text-l">
                                    <form action="" onSubmit={this.onSubmit}>
                                        <div className="flex flex-col w-full">
                                            <label htmlFor="username" className="">Username</label>
                                            <input type="email" placeholder="Enter your username" className="mt-2 mb-5 w-content text-md rounded-md px-3 py-2 placeholder:text-slate-200 bg-slate-500 font-thin" onChange={this.onChange} value={username} />
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <label htmlFor="password" className="">Password</label>
                                            <input type="password" placeholder="Enter your password" className="mt-2 mb-5 text-md rounded-md px-3 py-2 placeholder:text-slate-200 bg-slate-500 font-thin"  onChange={this.onChange} value={password}/>
                                        </div>
                                        <button type="submit" className="block text-md rounded-md bg-gray-400 px-5 py-2 mx-auto mt-5">Submit</button>
                                    </form>
                                </div>
                                <div className="mt-5 pt-4 border w-full border-gray-500 border-t-[1px] border-b-0 border-r-0 border-l-0">
                                    <p>Forgot your password?&nbsp;&nbsp;&nbsp;&nbsp;<a href="" className="font-extrabold">Click here</a></p>
                                    <p>Don't have an account?&nbsp;&nbsp;&nbsp;<Link to="/register" className="font-extrabold">Signup now</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login); 
