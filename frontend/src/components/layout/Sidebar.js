import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'

// Initial sidebar 
// className="flex-shrink-0 flex flex-row bg-slate-200 border border-r-300 overflow-x:hidden h-full overflow-y:hidden "

export default function Sidebar() {
  return (
        <aside id="sidebar" className=" flex-shrink-0 flex flex-row bg-slate-200 border border-r-300 ">
            <div className="items-center mt-28 mx-auto">
                <div className="flex flex-col space-y-6 py-2 px-10">
                    
                    <Link to="/">Dashboard</Link>
                    <Link to="/monthly_expenditure">Monthly Expenditure</Link>
                    <Link to="/this_month">This Month</Link>
                    <Link to="/account">Account</Link>
                    <Link to="/settings">Settings</Link>
                    {/* <a href="./dashboard-hero.html">Dashboard</a> */}
                    {/* <a href="./monthly-expenditure.html">Monthly Expenditure</a>
                    <a href="./this-month.html">This Month</a> */}
                    {/* <a href="./account.html">Account</a> */}
                    {/* <a href="./settings.html">Settings</a> */}
                </div>
                <div className="flex flex-col mt-14 mx-2">
                    <div className="bg-black text-white px-4 py-3 rounded-lg">
                        <div className="text-base">
                            <p>Get the PRO version for <br /> more features!</p>
                        </div>
                        <div className="mt-3 text-sm">
                            <p>Link credit cards and bank<br /> accounts, get monthly<br /> 
                                estimations and many<br /> more features!</p>
                        </div>
                        <div className="mt-3 text-base bg-white rounded-full text-center p-1 text-black">
                            <button>Get Started!</button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
  )
}
