import React, {Fragment, useState, useReducer} from 'react'
import ReactDOM from 'react-dom'; 
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import Carousel from './Carousel'
import Graph from './Graph'
import Form from './Form'
import RecentAdditions from './RecentAdditions'
import Footer from '../layout/Footer'

// convert to functional component to class based component so that i can easily rerender it 

export default function Home() {

    return (
        <Fragment>

            <div id="hero" className="flex-1 px-12 pt-1 pb-4 bg-slate-100 h-full w-full overflow-y-scroll">

                <div className="flex justify-between w-full items-center">
                    <div >
                        <p className="p-4 text-lg">Dashboard</p>
                    </div>
                    <div className="">
                        <button className="rounded-md border border-gray-200 px-3 py-2 text-md bg-white">Filter</button>
                    </div>
                </div>

                <Carousel/>            

                <div className ="flex justify-between">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row">
                            <div className="flex flex-col w-8/12 mt-3 mb-3">

                                <div className="flex justify-between w-full items-center">
                                    <div >
                                        <p className="p-4 text-lg">Spendings Overview</p>
                                    </div>
                                    <div className="">
                                        <button className="rounded-md border border-gray-200 px-3 py-2 text-md bg-white">Filter</button>
                                    </div>
                                </div>

                                <Graph/>

                            </div>

                            <div className="flex flex-col w-4/12 mt-3 mb-3 pl-3 ">

                                <div className="flex justify-between w-full items-center">
                                    <div >
                                        <p className="p-4 text-lg">Add new spendings!</p>
                                    </div>
                                    <div className="">
                                        <button className="rounded-md border border-gray-200 px-3 py-2 text-md bg-white">Filter</button>
                                    </div>
                                </div>

                                <Form />

                            </div>

                           
                        </div>

                        <div className="flex flex-col">
                            <div className="flex-1">
                                <div className="flex-col">

                                    <div className="flex justify-between w-full items-center">
                                        <div >
                                            <p className="p-4 text-lg">Recent Additions</p>
                                        </div>
                                        <div className="">
                                            <button className="rounded-md border border-gray-200 px-3 py-2 text-md bg-white">Filter</button>
                                        </div>
                                    </div>

                                    <RecentAdditions />

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <Footer />

            </div>

        </Fragment>
    )
}
 