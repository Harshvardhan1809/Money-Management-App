import React, {Fragment} from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import Overview from './Overview'

import { getOverviewData } from '../../actions/data'

// export default function Graph(i_style_red, i_style_green) {
export class Graph extends React.Component {

    static propTypes = {
        overview_data : PropTypes.object.isRequired
    }

    componentDidMount(){
        this.props.getOverviewData(); 
    }

    render(){

        const i_style_red = {
            color: 'red'
        }
        
        const i_style_green = {
            color: 'green'
        }

        return (
            <Fragment>
                <div className="flex justify-between space-x-2 border border-gray-1 rounded-[10px] bg-white">

                    <div className="flex flex-col w-6/12">
                        <Overview />
                        {/* <img src="../../static/img/chart.png" className="pl-6 py-6" width="325" height="325" alt="" /> */}
                    </div>

                    <div className="flex flex-col w-6/12 text-center items-center justify-around">
                        <div className="flex">
                            <p className="text-[20px] text-slate-500 pl-7">Total spendings for today</p>
                        </div>
                        <div className="flex">
                            <p className="mt-3 text-[30px] text-red-500">&yen; {this.props.overview_data['total_today']}</p>
                        </div>
                        <div className="flex space-x-6">
                            <div className="flex flex-col ">
                                <p className="block">Yesterday</p>
                                <p className="mt-3 text-[17px]"><i className="fa fa-thin fa-arrow-up mr-2" style={i_style_green}></i>&yen; {this.props.overview_data['total_yesterday']}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="block">Last Week</p>
                                <p className="mt-3 text-[17px]"><i className="fa fa-thin fa-arrow-up mr-2" style={i_style_green}></i>&yen; {this.props.overview_data['total_last_week']}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="block">Last month</p>
                                <p className="mt-3 text-[17px]"><i className="fa fa-thin fa-arrow-down mr-2" style={i_style_red}></i>&yen; {this.props.overview_data['total_last_month']}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </Fragment>
        ) 

    }
}

const mapStateToProps = (state) => ({
    overview_data : state.data.overview_data
})

export default connect(mapStateToProps, {getOverviewData})(Graph); 
