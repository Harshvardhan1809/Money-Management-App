import React, {Fragment} from 'react'
import { render } from 'react-dom'

let i_style_red = {
    color: 'red'
}

let i_style_green = {
    color: 'green'
}

export default function Graph(i_style_red, i_style_green) {

  return (
    <Fragment>
        <div className="flex justify-between space-x-2 border border-gray-1 rounded-[10px] bg-white">
            <div className="flex flex-col w-6/12">
                <img src="../../static/img/chart.png" className="pl-6 py-6" width="325" height="325" alt="" />
            </div>

            <div className="flex flex-col w-6/12 text-center items-center justify-around">
                <div className="flex">
                    <p className="text-[20px] text-slate-500 pl-7">Total spendings for today</p>
                </div>
                <div className="flex">
                    <p className="mt-3 text-[30px] text-red-500">&yen; 53,432</p>
                </div>
                <div className="flex space-x-6">
                    <div className="flex flex-col ">
                        <p className="block">Yesterday</p>
                        <p className="mt-3 text-[17px]"><i className="fa fa-thin fa-arrow-up mr-2" style={i_style_green}></i>&yen; 2365</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="block">Last Week</p>
                        <p className="mt-3 text-[17px]"><i className="fa fa-thin fa-arrow-up mr-2" style={i_style_green}></i>&yen; 12743</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="block">Last month</p>
                        <p className="mt-3 text-[17px]"><i className="fa fa-thin fa-arrow-down mr-2" style={i_style_red}></i>&yen; 60,332</p>
                    </div>
                </div>
            </div>
        </div>
     </Fragment>

    ) 
}
