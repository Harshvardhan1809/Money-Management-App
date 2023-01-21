import React, {Fragment, Component} from 'react'

// Connecting React and Redux
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import { getSpendings } from '../../actions/data'

import { spending_choices } from '../../../static/utilities/spending_choices'
import { spending_icon_class } from '../../../static/utilities/spending_icon'

// FontAwesome icons 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                    <div className="flex space-x-2 w-1/4 font-bold">
                        <p className="text-sm"><i className="fa fa-thin fa-film fa-xl invisible"></i></p>
                        <p>Category</p>
                    </div>
                    <div className="flex w-3/4 font-bold">
                        <div className="flex w-1/4 justify-between"><p>Amount</p></div>
                        <div className="flex w-1/4"><p>Date</p></div>
                        <div className="flex w-1/4"><p>Action</p></div>
                        <div className="flex w-1/4"><p>Notes</p></div>
                    </div>
                </div>
                
                { this.props.spendings.map(spending =>(
                    <div className="flex justify-between p-2">
                        <div className="flex space-x-2 w-1/4">
                            <p className="text-sm"><FontAwesomeIcon icon={`${spending_icon_class[spending.type1]}`} size="xl" /></p>
                            <p>{spending_choices[spending.type1]}</p>
                        </div>
                        <div className="flex w-3/4">
                            <div className="flex w-1/4 justify-between"><p>&yen;{spending.amount}</p></div>
                            <div className="flex w-1/4"><p>{spending.date}</p></div>
                            <div className="flex w-1/4"><p>Action</p></div>
                            <div className="flex w-1/4"><p>{spending.note}</p></div>
                        </div>
                    </div>
                )) }
            </div> 
        </Fragment>       
    )

}
}

// get state and call getLeads
const mapStateToProps = state => ({
    spendings: state.data.spendings
})

export default connect(mapStateToProps, {getSpendings} )(RecentAdditions); 


