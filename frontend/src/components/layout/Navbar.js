import React, {Fragment} from 'react'

export default function Navbar() {
  return (
        <div className="top-0 w-screen inset-0" id="unscrollable-wrapper">
            <nav className="z-50 nav bg-white">
                <div className="flex items-center justify-between pr-2">
                    <div>
                        <a href="./dashboard-hero.html" className="ml-8">Money Management</a>
                        <a href="#" className="ml-8" id="sidebar-button">
                            <i className="fa fa-thin fa-bars fa"></i>
                        </a>
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
                            <a href="./account.html">
                                <i className="fa fa-thin fa-user fa-xl"></i>
                            </a>
                            <a href="#">
                                <i className="fa fa-thin fa-gift fa-xl"></i>
                            </a>
                            <a href="#">
                                <i className="fa fa-thin fa-bell fa-xl"></i>
                            </a>
                            <a href="./settings.html">
                                <i className="fa fa-thin fa-gear fa-xl"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
  )
}
