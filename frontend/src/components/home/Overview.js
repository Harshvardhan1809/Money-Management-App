import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getOverviewData } from '../../actions/data'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

export class Overview extends Component {

    static propTypes = {
        overview_graph_data : PropTypes.object.isRequired, 
        overview_data : PropTypes.object.isRequired
    }

    componentDidMount(){
        this.props.getOverviewData(); 
    }

    static renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
    }

    render(){
        return (
            <div>

                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                        <Pie
                            activeIndex={this.state.activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
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

            </div>
        )
    }


} 

const mapStateToProps = (state) =>({
    overview_data: state.data.overview_data, 
    overview_graph_data: state.data.overview_graph_data
})

export default connect(mapStateToProps, {getOverviewData})(Overview); 