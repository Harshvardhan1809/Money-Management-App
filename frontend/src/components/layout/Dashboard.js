import React, {Fragment} from 'react'

import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Mini_Sidebar from './Mini_Sidebar'
import Footer from './Footer'
import Home from './../home/Home'
import { Settings } from '../settings/Settings'
import {HashRouter as Router, Route, Routes, Redirect} from 'react-router-dom'
import { Settings } from '../settings/Settings'

export default function Dashboard() {

    const prop = {
        hi: "hello"
    }

    return (
        <Fragment>
            <Navbar />
            <section id="container" className="container mx-auto flex h-screen font-mulish">
                <Sidebar />
                <Mini_Sidebar />
                <main>
                    <Home />
                </main>
            </section>
        </Fragment> 
    )
}


                    // {/* <Routes>
                    //     <Route exact path="settings" element={<Settings/> } />
                    //     <Route exact path="home" element={<Home/> } />
                    // </Routes>  */}
                    // {/* <Settings props={prop} /> */}