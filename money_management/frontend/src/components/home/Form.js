import React, {Fragment} from 'react'
import { eng_spending_choices } from '../../../static/utilities/eng_spending_choices';
import { eng_spending_type } from '../../../static/utilities/eng_spending_type';
import { spending_type } from '../../../static/utilities/spending_type';
import { postSpending, getRecentAdditions } from '../../actions/data';
import {connect, useStore} from 'react-redux'
import PropTypes from 'prop-types'


export class Form extends React.Component {

    currentDate = () =>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        return today 
    }

    constructor(props){
        super(props);
        this.state = {
            amount: 0,
            type1:'shokuji',
            type2:'食事',
            date: this.currentDate(),
            memo: ''
        }    
    }

    static propTypes = {
        postSpending: PropTypes.func.isRequired, 
        getRecentAdditions: PropTypes.func.isRequired
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state); 
    }

    onSubmit = async (e) => {
        e.preventDefault(); 
        const {amount, type1, type2, date, memo} = this.state; 

        // try to make the axios call synchronous so that component updates after saving in db
        const a = await this.props.postSpending(amount, type1, type2, date, memo);  
        // update the store so the new addition will displayed in the list upon rerender
        this.props.getRecentAdditions(); 

        // the below setState rerenders the component
        this.setState({
            amount: 0,
            type1:'shokuji',
            type2:'食事',
            date: this.currentDate(),
            memo: ''
        })

    }

    render(){

        const { amount, type1, type2, date, memo } = this.state; 

        return (  
            <Fragment>
                <div className="flex justify-between space-x-2 border border-gray-1 rounded-[10px] bg-white p-3 bg-gray-900">
                    <form action="" className="w-full p-1.5 pt-4" onSubmit={this.onSubmit}>

                        <div className="mb-5">
                            <input type="text" id="amount" name="amount" onChange={this.onChange} className="text-3xl font-thin block w-full p-1.5 bg-gray-900 border border-r-0 border-l-0 border-t-0 border-b-1 border-gray-600 focus:outline-none text-gray-300" placeholder="¥" required  value={amount} />
                        </div>

                        <div className="mb-5">
                            <div className="flex justify-content-between">
                                <div className="flex flex-row p-1 w-1/2">
                                    <select id="underline_select" onChange={this.onChange} className="block py-2.5 px-0 w-full text-md text-gray-300 bg-transparent border-0 border-b-2 border-gray-200 appearance-none text-white border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200" name="type1" value={type1}>
                                        {/* <option selected>Category</option> */}
                                        {   
                                            Object.keys(eng_spending_choices).map(category => {
                                                return ( <option value={`${category}`}>{eng_spending_choices[`${category}`]}</option> )
                                            })
                                        }
                                        <option value="US">Food</option>
                                        <option value="CA">Transportation</option>
                                        <option value="FR">Clothes</option>
                                        <option value="DE">Entertainment</option>
                                    </select>
                                </div>
                                <div className="flex flex-row p-1 w-1/2">
                                    <select id="underline_select" onChange={this.onChange} className="block py-2.5 px-0 w-full text-md text-gray-300 bg-transparent border-0 border-b-2 border-gray-200 appearance-none border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200" name="type2"  value={type2}>
                                        {/* <option selected>Type</option> */}
                                        {   
                                            spending_type[`${this.state.type1}`].map(type => {
                                                return ( <option value={`${type}`}>{type}</option> )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <input type="date" id="date" name="date" onChange={this.onChange} className="text-md w-full p-1.5 bg-gray-900 border border-r-0 border-l-0 border-t-0 border-b-1 border-gray-600 focus:outline-none text-gray-300" required value={date} />
                        </div>

                        <div className="mb-5">
                            <input type="text" id="memo" name="memo" onChange={this.onChange}  className="text-md w-full p-1.5 bg-gray-900 border border-r-0 border-l-0 border-t-0 border-b-1 border-gray-600 focus:outline-none text-gray-300" placeholder="Type a memo" value={memo} />
                        </div>

                        <div className="flex justify-around">
                            <div className="flex flex-row">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </div>
                            <div className="flex flex-row">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Clear</button>
                            </div>                      
                        </div>

                    </form>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    data : state.data
})

export default connect(mapStateToProps, {postSpending, getRecentAdditions})(Form); 
