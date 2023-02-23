import React, {Fragment, useState} from 'react'

import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Mini_Sidebar from './Mini_Sidebar'
import Footer from './Footer'
import Home from './../home/Home'
import { Settings } from '../settings/Settings'
import Account from '../account/Account'
import MonthlyExpenditure from '../monthly_expenditure/MonthlyExpenditure'
import ThisMonth from '../this_month/ThisMonth'
import {HashRouter as Router, Route, Routes, Redirect} from 'react-router-dom'

// tips to adjust the height and width
// height -> set the height to accomodate the entire contents
// then set the height of the sidebar and content to fill the height 
// width -> make the content component fill the entire width 

export default function Dashboard() {

    // container grow mx-auto w-screen flex h-fit font-mulish overflow-hidden

    const [state, setBool] = useState(false); 

    function handleClick(){
        console.log("handle click is called"); 
        console.log('Print state in dashboard', state); 
        setBool(state => !state); 
    }

    const hello = () => {
        console.log("Hello World"); 
        console.log("Inside here"); 
        if(state) {
            console.log("State is true");
            Array(14).fill(0).map(val => {
                return(<div className="p-2 h-screen"> </div>)
            })
        }
        else{
            console.log("State is false");
            Array(2).fill(0).map(val => {
                return(<div className="p-2 h-screen"> </div>)
            })
        }
    }

    // when writing a function in the component, we need a callback function 
    // that's why we need Array.map(cal => { }) or () => { ()=> { } }

    return (
        <Fragment>
            <Navbar func={handleClick}/>
            {   
                Array(4).fill(0).map(val => {
                    console.log("Rendering again");
                    return(<div id="dummy_blank_nav" className="w-screen h-[67px] p-2 h-full"></div>)
                })
            }
            <section id="" className="flex font-mulish w-screen">
                {   
                    // hello()
                    Array(14).fill(0).map(val => {
                        return(<div className="p-2 h-screen"> </div>)
                    })
                    // () => {
                    //         console.log("Inside here"); 
                    //         if(state) {
                    //             console.log("State is true");
                    //             Array(14).fill(0).map(val => {
                    //                 return(<div className="p-2 h-screen"> </div>)
                    //             })
                    //         }
                    //         else{
                    //             console.log("State is false");
                    //             Array(2).fill(0).map(val => {
                    //                 return(<div className="p-2 h-screen"> </div>)
                    //             })
                    //         }
                    //     }
                    
                }
                <Sidebar />
                <Mini_Sidebar />
                <main className=" grow">
                    <Routes>
                        <Route exact path="" element={<Home/>}/>
                        <Route exact path="/this_month" element={<ThisMonth/>}/>
                        <Route exact path="/monthly_expenditure" element={<MonthlyExpenditure/>}/>
                        <Route exact path="/settings" element={<Settings/>}/>
                        <Route exact path="/account" element={<Account/>}/>
                    </Routes>
                    {/* <Home /> */}
                </main>
            </section>
        </Fragment> 
    )
}

function handler(){
    console.log("Hello World"); 
}

                    // {/* <Routes>
                    //     <Route exact path="settings" element={<Settings/> } />
                    //     <Route exact path="home" element={<Home/> } />
                    // </Routes>  */}
                    // {/* <Settings props={prop} /> */}