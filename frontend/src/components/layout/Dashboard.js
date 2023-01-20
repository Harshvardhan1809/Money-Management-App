import React, {Fragment} from 'react'

import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Mini_Sidebar from './Mini_Sidebar'
import Footer from './Footer'
import Home from './../home/Home'

export default function Dashboard() {
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
