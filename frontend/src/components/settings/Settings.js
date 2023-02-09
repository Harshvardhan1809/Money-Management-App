import React, {Fragment, Component} from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'

export class Settings extends Component {

    render(){

        console.log("Printing props",this.props)

        return(
            <Fragment>

                <div id="hero" className="px-12 pt-1 pb-4 bg-slate-100 h-screen overflow-scroll w-screen">

                    <div className="flex justify-between w-full items-center">
                        <div>
                            <p className="p-4 text-xl">Settings</p>
                        </div>
                    </div>

                    <section className="container">
                        <div className="flex flex-row">
                            <div className="w-4/12 p-4">
                                <div id = "settings-card" className="p-4 pb-6 bg-white rounded-[10px] bg-white"> 
                                    <div id="settings-panel" className="">
                                        <div className="text-lg border border-t-0 border-l-0 border-r-0 border-b-2">
                                            <a href="" id="terms-conditions-button">Terms &amp; Conditions</a>
                                        </div>
                                        <div className="pt-2 pb-2 pl-8 text-lg border border-t-0 border-l-0 border-r-0 border-b-2">
                                            <a href="" id="light-dark-button">Light/Dark Mode</a>
                                        </div>
                                        <div className="pt-2 pb-2 pl-8 text-lg border border-t-0 border-l-0 border-r-0 border-b-2">
                                            <a href="" id="about-us-button">About Us</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-8/12 p-4">
                                <div id="terms-conditions-header" className="bg-white py-8 pr-4 pl-8 mb-2 rounded-[10px]">
                                    <p className="text-2xl">Terms and Conditions</p>
                                    <p className="text-gray-400 text-base">* Details our policies and terms of use</p>
                                    <div id="terms-conditions-body" className="mt-4">
                                    </div>
                                </div>
                                <div id="light-dark-header" className="hidden bg-white py-8 pr-4 pl-8 mb-2 rounded-[10px]">
                                    <p className="text-2xl">Light/Dark Mode</p>
                                    <p className="text-gray-400 text-base">* Change the appearance</p>
                                    <div id="terms-conditions-body" className="mt-4">
                                        <form action="">
                                            <input type="checkbox" id="light-check" className="mt-2 mr-2" name="light-check" />
                                            <label htmlFor="light-check" className="mt-2">Light Mode</label><br />
                                            <input type="checkbox" id="dark-check" className="mt-2 mr-2" name="dark-check" />
                                            <label htmlFor="dark-check" className="mt-2">Dark Mode</label><br />
                                        </form>
                                        <button type="submit" className="block bg-black text-md text-white rounded-md px-5 py-2 mt-5">Change</button>
                                    </div>
                                </div>
                                <div id="about-us-header" className="hidden bg-white py-8 pr-4 pl-8 mb-2 rounded-[10px]">
                                    <p className="text-2xl">About Us</p>
                                    <p className="text-gray-400 text-base">* Regarding the creation and the creators of the service</p>
                                    <div id="terms-conditions-body" className="mt-4">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>   

            </Fragment>
        )
    }
}

