import React, {Fragment} from 'react'
import {Route, Routes, Redirect, Link} from 'react-router-dom'
// import signup_backgound from "../../../static/img/signup.jpg"

export class Register extends React.Component {

  render(){

    return (
        <main className="font-mulish bg-[#3c3d44]">
          <div className="flex">
          <section className="left-wrapper flex flex-row w-7/12 bg-[#3c3d44] px-32 py-20 h-screen">
            <div className="flex flex-col justify-between">
                <div className="text-gray-300 text-4xl font-extralight">
                    <p>Money Management &copy;</p>
                </div>
                <div className="text-gray-100">
                    <div className="text-xl font-light mb-4">
                        <p>A one stop solution</p>
                        <p>for your personal finances!</p>
                    </div>
                    <div className="text-gray-300 text-l font-light">
                        <p>Get graphical representations of your spendings,</p>
                        <p>monthly comparisons, estimations for the next month,</p>
                        <p>all in one place with a minimalistic user experience!</p>
                    </div>
                </div>
                <div className="text-gray-100">   
                    <div className="flex flex-row justify-between">
                        <p>&copy; Harshvardhan Kedare 2022</p>
                        <p><a href="https://github.com/Harshvardhan1809" target="_blank" className="p-2 text-md">About Me</a></p>
                    </div>
                </div>
            </div> 
          </section>
          <section className="right-wrapper flex flex-row w-5/12 h-screen bg-cover bg-center grayscale saturate-0 " style={{backgroundImage: "url(static/img/signup.jpg)"}}>
            <div className="wrapper w-full h-full bg-gray-700 mix-blend-overlay backdrop-opacity-30">
                <div className="m-40">
                    <form action="">
                        <div className="flex flex-col w-full">
                            <label htmlFor="username" className="text-white mb-2">Username</label>
                            <input type="email" placeholder="Enter your username" className="mt-2 mb-5 w-content text-white text-md rounded-md px-3 py-2 placeholder:text-white font-bold bg-black" /> 
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="password" className="text-white mb-2">Password</label>
                            <input type="password" placeholder="Enter your password" className="mb-5 w-content text-md text-white rounded-md px-3 py-2 placeholder:text-white bg-black font-bold " />
                        </div>
                        <button type="submit" className="block text-md text-white rounded-md bg-black px-5 py-2 mx-auto mt-5">Submit</button>
                    </form>
                    <div className='pt-10 flex justify-center'>
                      <p className="inline text-md text-white ">Already have an account?</p>
                      <Link to="/login" className="text-md text-white rounded-md bg-black mx-2 px-5 pt-3 pb-3">
                        Login
                      </Link>
                    </div>
                </div>
            </div>
          </section>  
        </div>
      </main>
    )
  }
}

export default Register; 

// Explanation for the backgroundImage url 
// https://stackoverflow.com/questions/71998700/django-not-rendering-the-images-present-in-the-images-folder-inside-the-build 
// Django does nothing here
