import React from 'react'
import { Link } from 'react-router-dom'

export default function Mini_Sidebar() {
  return (
        <aside id="sidebar-minimize" className="flex-shrink-0 flex flex-row bg-slate-200 border border-r-300 overflow-x:hidden hidden">
        <div className="items-center mt-28 mx-auto">
            <div className="flex flex-col space-y-8 py-2 px-5">
                <Link to="/"><i className="fa fa-thin fa-chart-line fa-xl"></i></Link>
                <Link to="/monthly_expenditure"><i className="fa fa-thin fa-calendar-week fa-xl"></i></Link>
                <Link to="/this_month"><i className="fa fa-thin fa-calendar fa-xl"></i></Link>
                <Link to="/account"><i className="fa fa-thin fa-user fa-xl"></i></Link>
                <Link to="/settings"> <i className="fa fa-thin fa-gear fa-xl"></i></Link>

            </div>
        </div>
    </aside>
  )
}


{/* <a href="./dashboard-hero.html">
<i className="fa fa-thin fa-chart-line fa-xl"></i>
</a>
<a href="#">
<i className="fa fa-thin fa-calendar-week fa-xl"></i>
</a>
<a href="#">
<i className="fa fa-thin fa-calendar fa-xl"></i>
</a>
<a href="./account.html">
<i className="fa fa-thin fa-user fa-xl"></i>
</a> */}
{/* <a href="./settings.html">
    <i className="fa fa-thin fa-gear fa-xl"></i>
</a> */}