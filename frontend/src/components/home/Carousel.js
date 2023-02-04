import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getCarouselData } from '../../actions/data'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { eng_spending_choices } from '../../../static/utilities/eng_spending_choices'

export class Carousel extends React.Component {

    // define the proptypes

    static propTypes = {
        carousel_data : PropTypes.object.isRequired
    }

    // call the actions on mounting 

    componentDidMount(){
        this.props.getCarouselData(); 
    }

    render(){
        return (
        <div className="carousel flex overflow-scroll flex-nowrap">

            {  Object.keys(this.props.carousel_data).map(data => {

                if(this.props.carousel_data[`${data}`] != 0){ 
                    
                    return(
                        <div className="carousel-item flex justify-between items-center">
                        <div className="flex flex-row">
                            <i className="fa fa-thin fa-utensils fa-2xl"></i>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[24px] text-right">{eng_spending_choices[`${data}`]}</p>
                            <p className="text-[15px] text-right">&yen;{this.props.carousel_data[`${data}`]} this month</p>
                        </div>
                        </div>
                    )
                }
            })}

            <div className="carousel-item flex justify-between items-center">
                <div className="flex flex-row">
                    <i className="fa fa-thin fa-utensils fa-2xl"></i>
                </div>
                <div className="flex flex-col">
                    <p className="text-[24px] text-right">Food</p>
                    <p className="text-[15px] text-right">&yen;1200 this month</p>
                </div>
            </div>

            <div className="carousel-item flex justify-between items-center">
                <div className="flex flex-row">
                    <i className="fa fa-thin fa-train fa-2xl"></i>
                </div>
                <div className="flex flex-col">
                    <p className="text-[24px] text-right">Transportation</p>
                    <p className="text-[15px] text-right">&yen;3800 this month</p>
                </div>
            </div>
            
            <div className="carousel-item flex justify-between items-center">
                <div className="flex flex-row">
                    <i className="fa fa-thin fa-shirt fa-2xl"></i>
                </div>
                <div className="flex flex-col">
                    <p className="text-[24px] text-right">Clothes</p>
                    <p className="text-[15px] text-right">&yen;3800 this month</p>
                </div>
            </div>   

            {/* <div className="carousel-item flex justify-between items-center">
                <div className="flex flex-row">
                    <i className="fa fa-solid fa-film fa-2xl"></i>
                </div>
                <div className="flex flex-col">
                    <p className="text-[24px] text-right">Entertainment</p>
                    <p className="text-[15px] text-right">&yen;3800 this month</p>
                </div>
            </div>     

            <div className="carousel-item flex justify-between items-center">
                <div className="flex flex-row">
                    <i className="fa fa-solid fa-film fa-2xl"></i>
                </div>
                <div className="flex flex-col">
                    <p className="text-[24px] text-right">Entertainment</p>
                    <p className="text-[15px] text-right">&yen;3800 this month</p>
                </div>
            </div>      */}

        </div>

        )
    }
}

// map state to the props

const mapStateToProps = state => ({
    carousel_data: state.data.carousel_data
})

// connect the props to the component 

export default connect(mapStateToProps, {getCarouselData})(Carousel);
