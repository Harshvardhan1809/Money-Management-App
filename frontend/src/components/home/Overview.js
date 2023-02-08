import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getOverviewGraph, getOverviewData } from '../../actions/data'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

import { eng_spending_choices } from '../../../static/utilities/eng_spending_choices'

// Sample input 
const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
            {eng_spending_choices[`${payload.name}`]}
            </text> 
            <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
            />
            <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
            />

        </g>
    );
};


export class Overview extends Component {

    static propTypes = {
        overview_graph_data : PropTypes.array.isRequired, 
        overview_data : PropTypes.object.isRequired
    }

    componentDidMount(){
        this.props.getOverviewData(); 
        this.props.getOverviewGraph(); 
        
    }

    state = {
        activeIndex: 0,
    };

    onPieEnter = (_, index) => {
        this.setState({
            activeIndex: index,
        });
    };

    // Must understand the working of how the graph works smh 
    render(){

        return (
                    <ResponsiveContainer width={325} height={340}>
                        <PieChart width="100%" height="100%">
                            <Pie
                                activeIndex={this.state.activeIndex}
                                activeShape={renderActiveShape}
                                data={this.props.overview_graph}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                onMouseEnter={this.onPieEnter}
                            />
                        </PieChart>
                    </ResponsiveContainer>         
        )
    }


} 

const mapStateToProps = (state) =>({
    overview_data: state.data.overview_data, 
    overview_graph: state.data.overview_graph
})

export default connect(mapStateToProps, {getOverviewData, getOverviewGraph})(Overview); 