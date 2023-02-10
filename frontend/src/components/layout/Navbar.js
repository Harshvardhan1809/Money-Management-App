import React, {Fragment} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

export class Navbar extends React.Component {

    // Commonly, the props as a variable are used to pass dynamic or processed data to a child component so the child component can consume and process it.

    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    state = {
        redirect : false
    }; 

    onClick = (e) => {
        console.log(e)
        this.setState({redirect : true}); 
    }

    render(){

        // destructing the state
        console.log("Print the state", this.state)
        const {redirect} = this.state;  
        console.log("Print the value", redirect)

        if(redirect){
            // pressing this, you just have to change the component displayed in the dashboard from Home to something else 
            // return (<Navigate to="/front" />)
        }

        return (
    
            <div className="top-0 w-screen inset-0" id="unscrollable-wrapper">
                <nav className="z-50 nav bg-white">
                    <div className="flex items-center justify-between pr-2">
                        <div>
                            <button className="ml-8" onClick={this.onClick}>Money Management</button>
                            <button className="ml-8" id="sidebar-button">
                                <i className="fa fa-thin fa-bars fa"></i>
                            </button>
                        </div>
                        <div className="flex">
                            <div className="flex flex-row space-x-8">
                                <form action="">
                                    <div className="px-3 -mt-1 rounded-full shadow-sm bg-slate-200">
                                        <input type="text" placeholder="Search.." className="focus:outline-none m-1 placeholder:text-slate-400 bg-slate-200" />
                                        <button type="Submit">
                                            <i className="fa fa-thin fa-magnifying-glass"></i>
                                        </button>
                                    </div>
                                </form>
                                <Link to="/account"><i className="fa fa-thin fa-user fa-xl"></i></Link>
                                <a href="#">
                                    <i className="fa fa-thin fa-gift fa-xl"></i>
                                </a>
                                <a href="#">
                                    <i className="fa fa-thin fa-bell fa-xl"></i>
                                </a>
                                <Link to="/settings"> <i className="fa fa-thin fa-gear fa-xl"></i></Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )

    }

}

export default Navbar

{/* <a href="./account.html">
    <i className="fa fa-thin fa-user fa-xl"></i>
</a> */}
{/* <a href="./settings.html">
    <i className="fa fa-thin fa-gear fa-xl"></i>
</a> */}