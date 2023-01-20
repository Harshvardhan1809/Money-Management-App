import React, {Fragment, Component} from 'react'

// Connecting React and Redux
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import { getSpendings } from '../../actions/data'


// When the component mounts, we call getLeads, the props get loaded into component as props from reducers

export class RecentAdditions extends Component {

    static propTypes = {
        spendings: PropTypes.array.isRequired
    }

    componentDidMount(){
        this.props.getSpendings(); 
    }


    render(){

    return (
        <Fragment>
            <div className="flex flex-col text-base rounded-md border border-gray-200 pl-4 px-3 py-2 text-md bg-white">
                <div className="flex justify-between p-2">
                    <div className="flex space-x-2 w-1/4">
                        <p className="text-sm"><i className="fa fa-thin fa-utensils fa-xl"></i></p>
                        <p>Food</p>
                    </div>
                    <div className="flex w-3/4">
                        <div className="flex w-1/4 justify-between"><p>Amount</p></div>
                        <div className="flex w-1/4"><p>Date</p></div>
                        <div className="flex w-1/4"><p>Action</p></div>
                        <div className="flex w-1/4"><p>Notes</p></div>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex space-x-2 w-1/4">
                        <p className="text-sm"><i className="fa fa-thin fa-train fa-xl"></i></p>
                        <p>Transportation</p>
                    </div>
                    <div className="flex w-3/4">
                        <div className="flex w-1/4 justify-between"><p>Amount</p></div>
                        <div className="flex w-1/4"><p>Date</p></div>
                        <div className="flex w-1/4"><p>Action</p></div>
                        <div className="flex w-1/4"><p>Notes</p></div>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex space-x-2 w-1/4">
                        <p className="text-sm"><i className="fa fa-thin fa-film fa-xl"></i></p>
                        <p>Entertainment</p>
                    </div>
                    <div className="flex w-3/4">
                        <div className="flex w-1/4 justify-between"><p>Amount</p></div>
                        <div className="flex w-1/4"><p>Date</p></div>
                        <div className="flex w-1/4"><p>Action</p></div>
                        <div className="flex w-1/4"><p>Notes</p></div>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex space-x-2 w-1/4">
                        <p className="text-sm"><i className="fa fa-thin fa-film fa-xl"></i></p>
                        <p>Entertainment</p>
                    </div>
                    <div className="flex w-3/4">
                        <div className="flex w-1/4 justify-between"><p>Amount</p></div>
                        <div className="flex w-1/4"><p>Date</p></div>
                        <div className="flex w-1/4"><p>Action</p></div>
                        <div className="flex w-1/4"><p>Notes</p></div>
                    </div>
                </div>
            </div> 
        </Fragment>       
    )

}
}

// get state and call getLeads

const mapStateToProps = state => ({
    leads: state.data.spendings
})

export default connect(mapStateToProps, {getSpendings} )(RecentAdditions); 